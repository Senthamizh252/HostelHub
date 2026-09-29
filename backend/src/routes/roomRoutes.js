const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', roomController.getAllRooms);
router.post('/', roleMiddleware(['admin']), roomController.createRoom);
router.put('/:id', roleMiddleware(['admin']), roomController.updateRoom);
router.delete('/:id', roleMiddleware(['admin']), roomController.deleteRoom);

module.exports = router;