import express from 'express';
import { crearAccion, eliminarAccion, getAcciones, modificaAccion } from '../controllers/accionesController.js';

const router = express.Router();


router.get('/', getAcciones);
router.post('/', crearAccion );
router.delete('/:id', eliminarAccion);
router.put('/:id', modificaAccion)


export default router; 