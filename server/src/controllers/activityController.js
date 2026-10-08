const ActivityLog = require('../models/ActivityLog');

// @desc    Get recent activity logs
// @route   GET /api/activities
// @access  Private
const getActivities = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 30;
    const activities = await ActivityLog.find()
      .populate('user', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActivities
};
