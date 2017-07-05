import express from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import { getUser } from '../controllers/userController';
import isOwner from '../middleware/getCurrentUser';

const router = express.Router();

// GET
router.get('/:username', isOwner, catchErrors(getUser));

export default router;