import express from 'express';
import { getBooks, saveBook } from '../controllers/bookController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

// GET
router.get('/books', catchErrors(getBooks));

// POST
router.post('/books/add', catchErrors(saveBook));

export default router;