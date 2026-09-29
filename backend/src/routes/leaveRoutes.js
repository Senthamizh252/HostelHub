const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', leaveController.getAllLeaves);
router.post('/', roleMiddleware(['student']), leaveController.createLeave);
router.put('/:id', roleMiddleware(['admin', 'warden']), leaveController.updateLeave);

module.exports = router;