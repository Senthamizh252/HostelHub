const express = require('express');
const router = express.Router();
const messMenuController = require('../controllers/messMenuController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', messMenuController.getMessMenu);
router.post('/', roleMiddleware(['admin']), messMenuController.createMessMenu);
router.put('/:id', roleMiddleware(['admin']), messMenuController.updateMessMenu);

module.exports = router;