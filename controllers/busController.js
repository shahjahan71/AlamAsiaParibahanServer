const Bus = require('../models/Bus');

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ busNumber: 1 });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createBus = async (req, res) => {
  try {
    const { busNumber } = req.body;
    const newBus = new Bus({ busNumber });
    await newBus.save();
    res.status(201).json(newBus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};