// backend/models/CreditReport.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const creditReportSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    loans: [{
        amount: Number,
        status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
        date: { type: Date, default: Date.now }
    }],
    score: { type: Number, default: 600 }
});

module.exports = mongoose.model('CreditReport', creditReportSchema);
