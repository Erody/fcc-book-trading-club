import express from 'express';
import { getBooks } from '../controllers/bookController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

router.get('/books', catchErrors(getBooks));

export default router;