const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', complaintController.getAllComplaints);
router.post('/', roleMiddleware(['student']), complaintController.createComplaint);
router.put('/:id', roleMiddleware(['admin', 'warden']), complaintController.updateComplaint);
router.delete('/:id', roleMiddleware(['admin']), complaintController.deleteComplaint);

module.exports = router;