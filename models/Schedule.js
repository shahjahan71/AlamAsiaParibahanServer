const mongoose = require('mongoose');
const { format } = require('date-fns');

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
    get: function(date) {
      return format(date, 'yyyy-MM-dd');
    },
    set: function(date) {
      const d = new Date(date);
      return new Date(Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
      ));
    }
  },
  runningBuses: [{
    position: Number,
    busNumber: String,
    departureTime: String
  }],
  offChartBuses: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ScheduleSchema.index({ date: 1 });

module.exports = mongoose.model('Schedule', ScheduleSchema);