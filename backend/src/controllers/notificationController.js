const db = require('../config/db');

exports.getNotifications = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM notifications WHERE user_id = ?', [req.user.userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};