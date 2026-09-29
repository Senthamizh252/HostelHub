const db = require('../config/db');

exports.getMessMenu = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM mess_menu');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createMessMenu = async (req, res) => {
    try {
        const { day_of_week, breakfast, lunch, snacks, dinner } = req.body;
        const [result] = await db.query('INSERT INTO mess_menu (day_of_week, breakfast, lunch, snacks, dinner) VALUES (?, ?, ?, ?, ?)', [day_of_week, breakfast, lunch, snacks, dinner]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMessMenu = async (req, res) => {
    try {
        const { day_of_week, breakfast, lunch, snacks, dinner } = req.body;
        await db.query('UPDATE mess_menu SET day_of_week=?, breakfast=?, lunch=?, snacks=?, dinner=? WHERE id=?', [day_of_week, breakfast, lunch, snacks, dinner, req.params.id]);
        res.json({ message: 'Mess menu updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};