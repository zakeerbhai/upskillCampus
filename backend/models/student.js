const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  attendance: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  marks: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
