const scheduleService = require('../services/scheduleService');
const { format, parseISO, isValid } = require('date-fns');

exports.getSchedule = async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }
    
    const dateObj = parseISO(date);
    if (!isValid(dateObj)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }
    
    const schedule = await scheduleService.getScheduleForDate(dateObj);
    
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    
    res.json({
      date: format(schedule.date, 'yyyy-MM-dd'),
      runningBuses: schedule.runningBuses,
      offChartBuses: schedule.offChartBuses
    });
    
  } catch (error) {
    console.error('Error getting schedule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};