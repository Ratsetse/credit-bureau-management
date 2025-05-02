const express = require('express');
const router = express.Router();
const {
    createOrUpdateReport,
    getReportByUser,
    getReportByEmail,
} = require('../controllers/reportController');

// ✅ Put specific route BEFORE the dynamic :userId route
router.get('/by-email/:email', getReportByEmail); // <- MUST be above
router.get('/:userId', getReportByUser);
router.post('/', createOrUpdateReport);

module.exports = router;
