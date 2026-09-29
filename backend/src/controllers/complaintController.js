const db = require('../config/db');

exports.getAllComplaints = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM complaints');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createComplaint = async (req, res) => {
    try {
        const { student_id, room_id, category, description, priority } = req.body;
        const [result] = await db.query('INSERT INTO complaints (student_id, room_id, category, description, priority) VALUES (?, ?, ?, ?, ?)', [student_id, room_id, category, description, priority]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateComplaint = async (req, res) => {
    try {
        const { status } = req.body;
        await db.query('UPDATE complaints SET status=? WHERE id=?', [status, req.params.id]);
        res.json({ message: 'Complaint updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteComplaint = async (req, res) => {
    try {
        await db.query('DELETE FROM complaints WHERE id=?', [req.params.id]);
        res.json({ message: 'Complaint deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};