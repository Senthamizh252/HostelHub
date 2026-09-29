const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'backend', 'src', 'controllers');
const routesDir = path.join(__dirname, 'backend', 'src', 'routes');

if (!fs.existsSync(controllersDir)) fs.mkdirSync(controllersDir, { recursive: true });
if (!fs.existsSync(routesDir)) fs.mkdirSync(routesDir, { recursive: true });

const controllers = {
  'studentController.js': `const db = require('../config/db');

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
};`,

  'roomController.js': `const db = require('../config/db');

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
};`,

  'complaintController.js': `const db = require('../config/db');

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
};`,

  'leaveController.js': `const db = require('../config/db');

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
};`,

  'announcementController.js': `const db = require('../config/db');

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
};`,

  'messMenuController.js': `const db = require('../config/db');

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
};`,

  'lostFoundController.js': `const db = require('../config/db');

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
};`,

  'notificationController.js': `const db = require('../config/db');

exports.getNotifications = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM notifications WHERE user_id = ?', [req.user.userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};`
};

const routes = {
  'studentRoutes.js': `const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin', 'warden']), studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);

module.exports = router;`,

  'roomRoutes.js': `const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', roomController.getAllRooms);
router.post('/', roleMiddleware(['admin']), roomController.createRoom);
router.put('/:id', roleMiddleware(['admin']), roomController.updateRoom);
router.delete('/:id', roleMiddleware(['admin']), roomController.deleteRoom);

module.exports = router;`,

  'complaintRoutes.js': `const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', complaintController.getAllComplaints);
router.post('/', roleMiddleware(['student']), complaintController.createComplaint);
router.put('/:id', roleMiddleware(['admin', 'warden']), complaintController.updateComplaint);
router.delete('/:id', roleMiddleware(['admin']), complaintController.deleteComplaint);

module.exports = router;`,

  'leaveRoutes.js': `const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', leaveController.getAllLeaves);
router.post('/', roleMiddleware(['student']), leaveController.createLeave);
router.put('/:id', roleMiddleware(['admin', 'warden']), leaveController.updateLeave);

module.exports = router;`,

  'announcementRoutes.js': `const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', announcementController.getAllAnnouncements);
router.post('/', roleMiddleware(['admin', 'warden']), announcementController.createAnnouncement);
router.put('/:id', roleMiddleware(['admin', 'warden']), announcementController.updateAnnouncement);
router.delete('/:id', roleMiddleware(['admin']), announcementController.deleteAnnouncement);

module.exports = router;`,

  'messMenuRoutes.js': `const express = require('express');
const router = express.Router();
const messMenuController = require('../controllers/messMenuController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', messMenuController.getMessMenu);
router.post('/', roleMiddleware(['admin']), messMenuController.createMessMenu);
router.put('/:id', roleMiddleware(['admin']), messMenuController.updateMessMenu);

module.exports = router;`,

  'lostFoundRoutes.js': `const express = require('express');
const router = express.Router();
const lostFoundController = require('../controllers/lostFoundController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', lostFoundController.getAllLostFound);
router.post('/', lostFoundController.createLostFound);
router.put('/:id', lostFoundController.updateLostFound);

module.exports = router;`,

  'notificationRoutes.js': `const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', notificationController.getNotifications);

module.exports = router;`
};

for (const [file, content] of Object.entries(controllers)) {
  fs.writeFileSync(path.join(controllersDir, file), content);
}

for (const [file, content] of Object.entries(routes)) {
  fs.writeFileSync(path.join(routesDir, file), content);
}
console.log("Generated controllers and routes");
