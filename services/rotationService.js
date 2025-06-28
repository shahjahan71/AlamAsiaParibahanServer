const { 
  rotationPattern, 
  totalBuses, 
  runningBuses, 
  offChartBuses,
  firstBusTime,
  timeInterval
} = require('../config/rotationConfig');
const { addMinutes, format } = require('date-fns');

const { realBusNumbers } = require('../config/rotationConfig');

class RotationService {
  constructor() {
    this.initializeBuses();
  }

  initializeBuses() {
    this.allBuses = Array.from({ length: totalBuses }, (_, i) => i + 1);
  }

  calculateDepartureTimes() {
    const times = [];
    const [hours, minutes] = firstBusTime.split(':').map(Number);
    let currentTime = new Date().setHours(hours, minutes, 0, 0);
    
    for (let i = 0; i < runningBuses; i++) {
      times.push(format(new Date(currentTime), 'HH:mm'));
      currentTime = addMinutes(currentTime, timeInterval).getTime();
    }
    
    return times;
  }

  getInitialSchedule() {
    const running = [];
    const runningBusCount = 55;
    const departureTimes = this.calculateDepartureTimes();
    
    for (let i = 0; i < runningBuses; i++) {
      running.push({
        position: i + 1,
        busNumber: realBusNumbers[i],
        departureTime: departureTimes[i]
      });
    }
    
    // Buses 56-80 are off-chart (using real bus numbers)
    const offChart = realBusNumbers.slice(runningBusCount);
    
    return {
      runningBuses: running,
      offChartBuses: offChart // Now contains real bus numbers
    };
  }

  rotateSchedule(previousSchedule) {
    if (!previousSchedule) {
      return this.getInitialSchedule();
    }

    // 1. Get the last running bus (will move to off-chart)
    const lastRunningBus = previousSchedule.runningBuses.find(b => b.position === runningBuses);
    
    // 2. Get the last off-chart bus (will move to position 2 in running)
    const lastOffChartBus = previousSchedule.offChartBuses[previousSchedule.offChartBuses.length - 1];
    
    // 3. Create new off-chart buses:
    //    - Starts with last running bus
    //    - Then original off-chart except last one
    const newOffChartBuses = [
      lastRunningBus.busNumber,
      ...previousSchedule.offChartBuses.slice(0, -1)
    ];
    
    // 4. Create new running buses
    const departureTimes = this.calculateDepartureTimes();
    const newRunningBuses = [];
    
    // 4a. Apply rotation pattern to all positions except position 2
    const positionMap = {};
    
    previousSchedule.runningBuses
      .filter(b => b.position !== runningBuses) // exclude last running bus
      .forEach(bus => {
        const newPosition = rotationPattern[bus.position - 1];
        positionMap[newPosition] = bus.busNumber;
      });
    
    // 4b. Build new running buses array
    for (let position = 1; position <= runningBuses; position++) {
      if (position === 2) {
        // Special case: position 2 comes from off-chart
        newRunningBuses.push({
          position: 2,
          busNumber: lastOffChartBus,
          departureTime: departureTimes[1]
        });
      } else if (positionMap[position]) {
        // Position determined by rotation pattern
        newRunningBuses.push({
          position,
          busNumber: positionMap[position],
          departureTime: departureTimes[position - 1]
        });
      }
    }
    
    // Sort by position to ensure correct order
    newRunningBuses.sort((a, b) => a.position - b.position);
    
    return {
      runningBuses: newRunningBuses,
      offChartBuses: newOffChartBuses
    };
  }
}

module.exports = new RotationService();