import { Router } from 'express';
import { UserController } from './user.controller.js';

const router = Router();

// POST /api/users/register
router.post('/register', UserController.register);

// GET /api/users
router.get('/', UserController.getAllUsers);

export default router;