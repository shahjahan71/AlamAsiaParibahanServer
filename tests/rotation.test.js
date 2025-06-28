const { differenceInDays } = require('date-fns');
const rotationService = require('../services/rotationService');
const Bus = require('../models/Bus');
const mongoose = require('mongoose');

describe('Rotation Service', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/bus-management-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Bus.deleteMany({});
    
    // Create 70 test buses
    const buses = Array.from({ length: 70 }, (_, i) => ({
      busNumber: `BUS${1000 + i}`,
      index: i,
      status: 'active',
      disabled: false
    }));
    
    await Bus.insertMany(buses);
  });

  test('should return correct number of running and off-chart buses', async () => {
    const date = new Date();
    const result = await rotationService.getBusesForDate(date);
    
    expect(result.runningBuses.length).toBe(55);
    expect(result.offChartBuses.length).toBe(15);
  });

  test('should rotate buses correctly', async () => {
    const date1 = new Date(2023, 0, 1); // Jan 1, 2023
    const date2 = new Date(2023, 0, 2); // Jan 2, 2023
    
    const result1 = await rotationService.getBusesForDate(date1);
    const result2 = await rotationService.getBusesForDate(date2);
    
    // First bus of day1 should be last bus of day2's off-chart
    expect(result1.runningBuses[0].busNumber).toBe(result2.offChartBuses[14].busNumber);
    
    // Last bus of day1 should be first bus of day2's running
    expect(result1.runningBuses[54].busNumber).toBe(result2.runningBuses[0].busNumber);
  });

  test('should handle date differences correctly', async () => {
    const date1 = new Date(2023, 0, 1);
    const date2 = new Date(2023, 0, 71); // Exactly one full rotation
    
    const result1 = await rotationService.getBusesForDate(date1);
    const result2 = await rotationService.getBusesForDate(date2);
    
    // After full rotation, the lists should be identical
    expect(result1.runningBuses.map(b => b.busNumber))
      .toEqual(result2.runningBuses.map(b => b.busNumber));
  });
});