const db = require('../config/db');

exports.getAllAnnouncements = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM announcements');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAnnouncement = async (req, res) => {
    try {
        const { title, description, category, priority } = req.body;
        const created_by = req.user.userId;
        const [result] = await db.query('INSERT INTO announcements (title, description, category, priority, created_by) VALUES (?, ?, ?, ?, ?)', [title, description, category, priority, created_by]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateAnnouncement = async (req, res) => {
    try {
        const { title, description, category, priority } = req.body;
        await db.query('UPDATE announcements SET title=?, description=?, category=?, priority=? WHERE id=?', [title, description, category, priority, req.params.id]);
        res.json({ message: 'Announcement updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAnnouncement = async (req, res) => {
    try {
        await db.query('DELETE FROM announcements WHERE id=?', [req.params.id]);
        res.json({ message: 'Announcement deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};