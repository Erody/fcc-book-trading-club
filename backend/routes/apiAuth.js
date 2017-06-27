import express from 'express';
import { signup } from '../controllers/authController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

// POST
router.post('/signup', catchErrors(signup));

export default router;