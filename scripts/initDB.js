// scripts/resetDemoData.js
const mongoose = require('mongoose');
const Bus = require('../models/Bus');
const Schedule = require('../models/Schedule');
require('dotenv').config();

async function resetData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await Bus.deleteMany({});
    await Schedule.deleteMany({});

    // Create 70 buses (55 running + 15 off-chart)
    const buses = [];
    for (let i = 1; i <= 70; i++) {
      buses.push({
        busNumber: i <= 55 ? `RUN-${1000+i}` : `OFF-${2000+i}`,
        currentPosition: i,
        status: 'active',
        disabled: false
      });
    }
    await Bus.insertMany(buses);

    // Create today's schedule
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const runningBuses = await Bus.find({currentPosition: {$lte: 55}}).sort('currentPosition');
    const offChartBuses = await Bus.find({currentPosition: {$gt: 55}}).sort('currentPosition');

    await Schedule.create({
      date: today,
      runningBuses: runningBuses.map(bus => ({
        bus: bus._id,
        position: bus.currentPosition,
        time: calculateTime(bus.currentPosition)
      })),
      offChartBuses: offChartBuses.map(bus => ({
        bus: bus._id,
        position: bus.currentPosition
      }))
    });

    console.log('Database reset successfully');
    process.exit(0);
  } catch (error) {
    console.error('Reset failed:', error);
    process.exit(1);
  }
}

function calculateTime(position) {
  const time = new Date();
  time.setHours(4, (position-1)*10, 0, 0); // Starting at 4:00 AM, 10 min intervals
  return time;
}

resetData();