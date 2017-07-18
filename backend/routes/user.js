import express from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import { getUser, updateUser} from '../controllers/userController';
import getCurrentUser from '../middleware/getCurrentUser';
import isAuthenticated from '../middleware/isAuthenticated';

const router = express.Router();

// GET
router.get('/:username', getCurrentUser, catchErrors(getUser));

// POST
router.post('/:username', isAuthenticated, catchErrors(updateUser));

export default router;