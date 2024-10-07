const Room = require('../models/RoomModel.js');
const mongoose = require('mongoose');


class RoomController {
  static async createRoom(req, res) {
    try {
      const room = new Room(req.body);
      await room.save();
      res.json(room);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create room' });
    }
  }

  static async getRooms(req, res) {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
  }

  static async joinRoom(req, res) {
    try {
      const roomId = req.params.roomId;
      const userId = req.user._id; // Obtém o ID do usuário autenticado
  
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      // Verifica se o usuário já está na sala
      if (room.users.includes(userId)) {
        return res.status(400).json({ error: 'User  already in room' });
      }
  
      // Adiciona o usuário à sala
      room.users.push(userId);
      await room.save();
  
      res.json({ message: 'Joined room successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to join room' });
    }
  };
}

module.exports = {
  createRoom: RoomController.createRoom,
  getRooms: RoomController.getRooms,
  joinRoom: RoomController.joinRoom,
};