// Rutas de la API.

import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();

/**
 * Definición de rutas para operaciones CRUD de usuarios
 */

// Obtener todos los usuarios
router.get('/', UserController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', UserController.getUserById);

// Crear un nuevo usuario
router.post('/', UserController.createUser);

// Actualizar un usuario existente
router.put('/:id', UserController.updateUser);

// Eliminar un usuario
router.delete('/:id', UserController.deleteUser);

export default router;