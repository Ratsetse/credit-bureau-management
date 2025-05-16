const Login = require("../models/Login");

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Login.findOne({ username, password });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { loginUser };
