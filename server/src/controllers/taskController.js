const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');

const formatStatus = (s) => {
  switch (s) {
    case 'todo':
      return 'To Do';
    case 'in_progress':
      return 'In Progress';
    case 'in_review':
      return 'In Review';
    case 'done':
      return 'Done';
    default:
      return s;
  }
};

// @desc    Get all tasks with optional search & filter
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const { search, priority, status } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    if (priority && priority !== 'all') {
      query.priority = priority;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .populate('creator', 'name email avatar')
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('creator', 'name email avatar');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate, tags, assignee } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required'
      });
    }

    // Determine order (append to end of column)
    const targetStatus = status || 'todo';
    const lastTask = await Task.findOne({ status: targetStatus }).sort({ order: -1 });
    const order = lastTask ? lastTask.order + 1 : 0;

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      status: targetStatus,
      priority: priority || 'medium',
      dueDate: dueDate || null,
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' && tags.trim() ? tags.split(',').map((t) => t.trim()) : [],
      assignee: assignee && assignee.trim() ? assignee.trim() : 'Unassigned',
      order,
      creator: req.user._id
    });

    const populatedTask = await Task.findById(task._id).populate('creator', 'name email avatar');

    // Audit log
    await ActivityLog.create({
      task: task._id,
      taskTitle: task.title,
      user: req.user._id,
      userName: req.user.name,
      action: 'created',
      details: `Created task "${task.title}" in column [${formatStatus(task.status)}]`
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: populatedTask
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task details
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const { title, description, status, priority, dueDate, tags, assignee } = req.body;
    const oldStatus = task.status;

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (assignee !== undefined) task.assignee = assignee.trim();
    if (tags !== undefined) {
      task.tags = Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
        ? tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [];
    }

    let statusChanged = false;
    if (status !== undefined && status !== oldStatus) {
      task.status = status;
      statusChanged = true;
    }

    await task.save();
    const updated = await Task.findById(task._id).populate('creator', 'name email avatar');

    // Audit log
    await ActivityLog.create({
      task: task._id,
      taskTitle: task.title,
      user: req.user._id,
      userName: req.user.name,
      action: statusChanged ? 'status_changed' : 'updated',
      details: statusChanged
        ? `Moved "${task.title}" from [${formatStatus(oldStatus)}] to [${formatStatus(task.status)}]`
        : `Updated details for "${task.title}"`
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Quick status change (drag & drop or column shift)
// @route   PATCH /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res, next) => {
  try {
    const { status, order } = req.body;

    if (!['todo', 'in_progress', 'in_review', 'done'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status provided'
      });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const oldStatus = task.status;
    task.status = status;
    if (typeof order === 'number') {
      task.order = order;
    }

    await task.save();
    const updated = await Task.findById(task._id).populate('creator', 'name email avatar');

    // Audit log
    await ActivityLog.create({
      task: task._id,
      taskTitle: task.title,
      user: req.user._id,
      userName: req.user.name,
      action: 'status_changed',
      details: `Moved "${task.title}" from [${formatStatus(oldStatus)}] to [${formatStatus(status)}]`
    });

    res.status(200).json({
      success: true,
      message: `Status updated to ${formatStatus(status)}`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const taskTitle = task.title;
    await Task.findByIdAndDelete(req.params.id);

    // Audit log
    await ActivityLog.create({
      task: null,
      taskTitle,
      user: req.user._id,
      userName: req.user.name,
      action: 'deleted',
      details: `Deleted task "${taskTitle}"`
    });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
};
