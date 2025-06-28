// Complete and corrected 54-position rotation pattern
// (Position 55 is handled separately - moves to off-chart)
const rotationPattern = [
    4,   // Position 1 → 4 next day
    6,   // Position 2 → 6 next day
    5,   // Position 3 → 5 next day
    7,   // Position 4 → 7 next day
    9,   // Position 5 → 9 next day
    1,   // Position 6 → 1 next day
    3,   // Position 7 → 3 next day
    14,  // Position 8 → 14 next day
    12,  // Position 9 → 12 next day
    13,  // Position 10 → 13 next day
    8,   // Position 11 → 8 next day
    10,  // Position 12 → 10 next day
    11,  // Position 13 → 11 next day
    19,  // Position 14 → 19 next day
    18,  // Position 15 → 18 next day
    20,  // Position 16 → 20 next day
    22,  // Position 17 → 22 next day
    16,  // Position 18 → 16 next day (corrected from 15)
    15,  // Position 19 → 15 next day (corrected from 16)
    17,  // Position 20 → 17 next day
    25,  // Position 21 → 25 next day (corrected from 24)
    24,  // Position 22 → 24 next day (corrected from 21)
    27,  // Position 23 → 27 next day (corrected from 23)
    21,  // Position 24 → 21 next day (corrected from 27)
    23,  // Position 25 → 23 next day (corrected from 25)
    28,  // Position 26 → 28 next day (corrected from 26)
    30,  // Position 27 → 30 next day
    32,  // Position 28 → 32 next day
    31,  // Position 29 → 31 next day (corrected from 29)
    26,  // Position 30 → 26 next day (corrected from 30)
    35,  // Position 31 → 35 next day (corrected from 31)
    29,  // Position 32 → 29 next day (corrected from 32)
    36,  // Position 33 → 36 next day
    37,  // Position 34 → 37 next day (corrected from 36)
    38,  // Position 35 → 38 next day (corrected from 35)
    40,  // Position 36 → 40 next day (corrected from 40)
    33,  // Position 37 → 33 next day (corrected from 37)
    34,  // Position 38 → 34 next day (corrected from 33)
    42,  // Position 39 → 42 next day (corrected from 39)
    43,  // Position 40 → 43 next day
    44,  // Position 41 → 44 next day (corrected from 42)
    45,  // Position 42 → 45 next day (corrected from 45)
    39,  // Position 43 → 39 next day (corrected from 41)
    47,  // Position 44 → 47 next day (corrected from 44)
    41,  // Position 45 → 41 next day (corrected from 47)
    51,  // Position 46 → 51 next day
    50,  // Position 47 → 50 next day
    52,  // Position 48 → 52 next day
    54,  // Position 49 → 54 next day (corrected from 49)
    46,  // Position 50 → 46 next day
    48,  // Position 51 → 48 next day
    49,  // Position 52 → 49 next day (corrected from 52)
    55,  // Position 53 → 55 next day (corrected from 53)
    53   // Position 54 → 53 next day (corrected from 54)
    // Position 55 → moves to off-chart (handled separately)
  ];
  

  // Add this to your existing configuration
const initialStartDate = new Date(Date.UTC(2025, 5, 28)); // June 1, 2023 (months are 0-indexed)

// In config/rotationConfig.js
const realBusNumbers = [
    'MB-0219', 'DMB-8056', 'DMB-8749', 'DMB-7812', 'DMB-0339',
    'MB-0093', 'CMB-1437', 'MB-0117', 'DMB-2438', 'DMB-1284',
    'DMB-8748', 'DMB-2250', 'DMB-1492', 'MB-0072', 'DMB-7245',
    'DMB-8055', 'DMB-2056', 'MB-0145', 'MB-0125', 'DMB-9664',
    'DMB-2775', 'DMB-3926', 'DMB-8629', 'DMB-9663', 'DMB-1078',
    'MB-0330', 'MB-0078', 'DMB-1193', 'DMB-9051', 'MB-0074',
    'DMB-9898', 'DMB-7709', 'DMB-2408', 'DMB-2741', 'DMB-1480',
    'DMB-4235', 'MB-0132', 'DMB-8373', 'DMB-0464', 'DMB-0495',
    'DMB-9544', 'DMB-8793', 'DMB-9370', 'DMB-9604', 'DMB-9045',
    'DMB-3243', 'DMB-9170', 'DMB-8823', 'DMB-0380', 'MB-0334',
    'DMB-1677', 'MB-0149', 'DMB-0728', 'DMB-9549', 'MB-0134',
    'MB-0124', 'MB-0218', 'DMB-9166', 'DMB-5167', 'DMB-3735',
    'MB-0240', 'DMB-7944', 'DMB-2388', 'DMB-0620', 'NMB-0033',
    'DMB-7515', 'MB-0130', 'DMB-0448', 'DMB-8732', 'DMB-6624',
    'DMB-9347', 'DMB-5179', 'MB-0073', 'DMB-3899', 'MB-0107',
    'MB-0067', 'DMB-0376', 'BD-0001', 'BD-0002', 'BD-0003'
  ];
  

  module.exports = {
    rotationPattern,
    totalBuses: 80,
    runningBuses: 55,
    offChartBuses: 25,
    firstBusTime: '04:00',
    timeInterval: 10,
    initialStartDate,
    realBusNumbers
  };