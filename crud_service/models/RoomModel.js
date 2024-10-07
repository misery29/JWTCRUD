const mongoose = require('mongoose');
const uuid = require('uuid');

const roomSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  capacity: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  users: [
    {
      type: String,
      ref: 'User ',
    },
  ],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;