const db = require('../config/db');

exports.getAllLeaves = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM leave_requests');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createLeave = async (req, res) => {
    try {
        const { student_id, start_date, end_date, reason, emergency_contact } = req.body;
        const [result] = await db.query('INSERT INTO leave_requests (student_id, start_date, end_date, reason, emergency_contact) VALUES (?, ?, ?, ?, ?)', [student_id, start_date, end_date, reason, emergency_contact]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateLeave = async (req, res) => {
    try {
        const { status, warden_remarks } = req.body;
        await db.query('UPDATE leave_requests SET status=?, warden_remarks=? WHERE id=?', [status, warden_remarks, req.params.id]);
        res.json({ message: 'Leave updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};