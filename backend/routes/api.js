import express from 'express';
import { getBooks, saveBook, getBook, updateBook, deleteBook } from '../controllers/bookController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

// GET
router.get('/books', catchErrors(getBooks));
router.get('/book/:id', catchErrors(getBook));

// POST
router.post('/books/add', saveBook);

// PUT
router.put('/book/:id', catchErrors(updateBook));

// DELETE
router.delete('/book/:id', deleteBook);

export default router;