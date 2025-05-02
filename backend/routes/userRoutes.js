// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { createUser, getAllUsers } = require('../controllers/userController');

router.post('/', createUser);
router.get('/', getAllUsers);

module.exports = router;
