const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin', 'warden']), studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);

module.exports = router;