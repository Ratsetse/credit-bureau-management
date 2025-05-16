const express = require("express");
const router = express.Router();
const Login = require("../models/Login");

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Login.findOne({ username, password });
        if (user) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
