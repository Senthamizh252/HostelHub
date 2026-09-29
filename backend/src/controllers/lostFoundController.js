const db = require('../config/db');

exports.getAllLostFound = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM lost_found');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createLostFound = async (req, res) => {
    try {
        const { type, item_name, description, location, date, contact_info } = req.body;
        const user_id = req.user.userId;
        const [result] = await db.query('INSERT INTO lost_found (user_id, type, item_name, description, location, date, contact_info) VALUES (?, ?, ?, ?, ?, ?, ?)', [user_id, type, item_name, description, location, date, contact_info]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateLostFound = async (req, res) => {
    try {
        const { status } = req.body;
        await db.query('UPDATE lost_found SET status=? WHERE id=?', [status, req.params.id]);
        res.json({ message: 'Lost and found item updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};