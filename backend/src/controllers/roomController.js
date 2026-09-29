const db = require('../config/db');

exports.getAllRooms = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM rooms');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createRoom = async (req, res) => {
    try {
        const { hostel_id, room_number, floor, capacity, status } = req.body;
        const [result] = await db.query('INSERT INTO rooms (hostel_id, room_number, floor, capacity, status) VALUES (?, ?, ?, ?, ?)', [hostel_id, room_number, floor, capacity, status]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const { hostel_id, room_number, floor, capacity, status } = req.body;
        await db.query('UPDATE rooms SET hostel_id=?, room_number=?, floor=?, capacity=?, status=? WHERE id=?', [hostel_id, room_number, floor, capacity, status, req.params.id]);
        res.json({ message: 'Room updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        await db.query('DELETE FROM rooms WHERE id=?', [req.params.id]);
        res.json({ message: 'Room deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};