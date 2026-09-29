const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', announcementController.getAllAnnouncements);
router.post('/', roleMiddleware(['admin', 'warden']), announcementController.createAnnouncement);
router.put('/:id', roleMiddleware(['admin', 'warden']), announcementController.updateAnnouncement);
router.delete('/:id', roleMiddleware(['admin']), announcementController.deleteAnnouncement);

module.exports = router;