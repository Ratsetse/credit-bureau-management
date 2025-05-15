const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { createUser, getAllUsers } = require('../controllers/userController');

router.post('/', createUser);
router.get('/', getAllUsers);

// ✅ THIS must exist
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

module.exports = router;
