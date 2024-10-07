require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const roomRoutes = require('./routes/RoomRoutes');
const initializeSocket = require('./socket');
const app = express();
app.use(express.json());

// Conecta ao banco de dados
mongoose.connect('mongodb://mongo:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Conectado ao banco de dados com sucesso!');
});

app.use('/api', roomRoutes);

const server = require('http').createServer(app);
initializeSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});