import express from 'express';
import { getBooks, saveBook, getBook, updateBook, deleteBook } from '../controllers/bookController';
import { catchErrors } from '../handlers/errorHandlers';
import isAuthenticated from '../middleware/isAuthenticated';

const router = express.Router();

// GET
router.get('/books', catchErrors(getBooks));
router.get('/book/:id', catchErrors(getBook));

// POST
router.post('/books/add', isAuthenticated, saveBook);

// PUT
router.put('/book/:id', isAuthenticated, catchErrors(updateBook));

// DELETE
router.delete('/book/:id', isAuthenticated, deleteBook);

export default router;