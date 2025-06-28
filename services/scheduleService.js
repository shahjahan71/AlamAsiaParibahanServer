const Schedule = require('../models/Schedule');
const rotationService = require('./rotationService');
const { format, parseISO, isEqual } = require('date-fns');
const { initialStartDate } = require('../config/rotationConfig');

class ScheduleService {
  async getScheduleForDate(date) {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const utcDate = new Date(Date.UTC(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate()
    ));
    
    // Check if this is the initial start date
    if (isEqual(utcDate, initialStartDate)) {
      return this.getInitialSchedule();
    }
    
    // Try to find existing schedule
    let schedule = await Schedule.findOne({ date: utcDate });
    
    if (schedule) {
      return schedule;
    }
    
    return this.generateScheduleForDate(utcDate);
  }

  async generateScheduleForDate(date) {
    const utcDate = new Date(date);
    const previousDate = new Date(utcDate);
    previousDate.setDate(utcDate.getDate() - 1);
    
    // Special case: if previous date is before initial date, use initial schedule
    const previousSchedule = previousDate < initialStartDate 
      ? await this.getInitialSchedule()
      : await Schedule.findOne({ date: previousDate }) || await this.generateScheduleForDate(previousDate);
    
    const rotatedSchedule = rotationService.rotateSchedule(previousSchedule);
    
    const newSchedule = new Schedule({
      date: utcDate,
      runningBuses: rotatedSchedule.runningBuses,
      offChartBuses: rotatedSchedule.offChartBuses
    });
    
    await newSchedule.save();
    return newSchedule;
  }

  async getInitialSchedule() {
    // Check if initial schedule already exists
    const existing = await Schedule.findOne({ date: initialStartDate });
    if (existing) return existing;
    
    const initialSchedule = rotationService.getInitialSchedule();
    
    const newSchedule = new Schedule({
      date: new Date(initialStartDate),
      runningBuses: initialSchedule.runningBuses,
      offChartBuses: initialSchedule.offChartBuses
    });
    
    await newSchedule.save();
    return newSchedule;
  }
}

module.exports = new ScheduleService();