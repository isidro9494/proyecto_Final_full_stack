import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './src/router/authRouter.js'; 
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectar la base de datos', err));

app.use('/auth', authRouter)

console.log('MONGO_URI:', process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('SECRET_KEY:', process.env.SECRET_KEY);
});