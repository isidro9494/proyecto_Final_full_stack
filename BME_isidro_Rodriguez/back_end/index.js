const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); 
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectar la base de datos', err));

app.use('/auth', authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
