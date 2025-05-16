// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require("./routes/authRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use("/api/auth", authRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully! 🚀');
        app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT} 🔥`));
    })
    .catch((err) => console.error('❌ MongoDB connection error:', err));
