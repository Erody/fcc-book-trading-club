import express from 'express';
import { getBooks, saveBook, getBook } from '../controllers/bookController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

// GET
router.get('/books', catchErrors(getBooks));
router.get('/book/:id', catchErrors(getBook));

// POST
router.post('/books/add', saveBook);

export default router;