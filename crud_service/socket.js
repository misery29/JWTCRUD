const socketIo = require('socket.io');

const initializeSocket = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {

    socket.on("join-room", (event) => {
      socket.join(event.roomId);
      io.to(event.roomId).emit(
        "user-connected", 
        `Usuário ${event.userId} entrou na sala ${event.roomId}`
      );

      socket.on('signal', (data) => {
        const { roomId, signalData } = data;

        io.to(roomId).emit('signal', signalData);
      });

      socket.on('disconnect', () => {
        io.to(event.roomId).emit('user-disconnected', `Usuário ${event.userId} saiu da sala`);
      });
    });
  });
};

module.exports = initializeSocket;