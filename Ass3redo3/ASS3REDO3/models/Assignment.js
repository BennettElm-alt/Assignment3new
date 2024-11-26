const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
