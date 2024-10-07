const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { createRoom, getRooms, joinRoom } = require('../controllers/RoomController');

const router = express.Router();

router.post('/rooms', authenticateToken, createRoom);
router.get('/rooms', authenticateToken, getRooms);
router.post('/rooms/:roomId/join', authenticateToken, joinRoom);

module.exports = router;