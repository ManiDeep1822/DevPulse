const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      default: null
    },
    taskTitle: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    action: {
      type: String,
      enum: ['created', 'updated', 'status_changed', 'deleted'],
      required: true
    },
    details: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ActivityLog', activityLogSchema);
