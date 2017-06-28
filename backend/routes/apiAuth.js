import express from 'express';
import { signup, login } from '../controllers/authController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

// POST
router.post('/signup', catchErrors(signup));
router.post('/login', catchErrors(login));

export default router;