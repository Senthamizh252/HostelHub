const express = require('express');
const router = express.Router();
const lostFoundController = require('../controllers/lostFoundController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', lostFoundController.getAllLostFound);
router.post('/', lostFoundController.createLostFound);
router.put('/:id', lostFoundController.updateLostFound);

module.exports = router;