
const CreditReport = require('../models/CreditReport');
const User = require('../models/User');

// ✅ Create or Update Credit Report
exports.createOrUpdateReport = async (req, res) => {
    console.log("📥 Incoming report request:", req.body);
    try {
        const { userId, loans } = req.body;
        console.log("Creating/updating report for userId:", userId); // Debug
        let report = await CreditReport.findOne({ userId });

        if (report) {
            report.loans.push(...loans);
        } else {
            report = new CreditReport({ userId, loans });
        }

        report.score = calculateCreditScore(report.loans);
        await report.save();

        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Get Report by User ID
exports.getReportByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const report = await CreditReport.findOne({ userId }).populate('userId');
        if (!report) throw new Error('Report not found');
        res.json(report);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// ✅ Get Report by Email
exports.getReportByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found with this email');

        const report = await CreditReport.findOne({ userId: user._id }).populate('userId');
        if (!report) throw new Error('Report not found for this user');

        res.json(report);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// ✅ Helper
function calculateCreditScore(loans) {
    let score = 700;
    loans.forEach((loan) => {
        if (loan.status === 'unpaid') score -= 50;
        else score += 20;
    });
    return Math.max(300, Math.min(score, 850));
}
