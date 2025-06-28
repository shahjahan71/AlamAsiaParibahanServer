const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// GET /api/buses/schedule?date=YYYY-MM-DD
router.get('/schedule', scheduleController.getSchedule);

module.exports = router;