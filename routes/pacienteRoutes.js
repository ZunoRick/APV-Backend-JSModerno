import express, { Router } from 'express';
const router = express.Router();

import checkAuth from '../middleware/authMiddleware.js';
import {
	agregarPaciente,
	obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente
} from '../controllers/pacienteController.js';

router
	.route('/')
	.post(checkAuth, agregarPaciente)
	.get(checkAuth, obtenerPacientes);

router
	.route('/:id')
	.get(checkAuth, obtenerPaciente)
	.put(checkAuth, actualizarPaciente)
	.delete(checkAuth, eliminarPaciente);

export default router;
