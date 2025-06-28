const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  busNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 80
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bus', BusSchema);