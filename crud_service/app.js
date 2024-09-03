require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

// Testa a conexão com o banco de dados
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.use('/products', productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
