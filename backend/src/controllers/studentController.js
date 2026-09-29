const db = require('../config/db');

exports.getAllStudents = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT s.*, u.email FROM students s JOIN users u ON s.user_id = u.id');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT s.*, u.email FROM students s JOIN users u ON s.user_id = u.id WHERE s.id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Student not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};