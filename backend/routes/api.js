import express from 'express';
import { getBooks, saveBook, getBook, updateBook, deleteBook, getSomeBooks } from '../controllers/bookController';
import { tradeInit, resolveTrade } from '../controllers/tradeController';
import { catchErrors } from '../handlers/errorHandlers';
import isAuthenticated from '../middleware/isAuthenticated';

const router = express.Router();

// GET
router.get('/books', catchErrors(getBooks));
router.get('/book/:id', catchErrors(getBook));
router.get('/trade/request/:username', isAuthenticated, catchErrors(tradeInit));

// POST
router.post('/books/add', isAuthenticated, saveBook);
router.post('/books/some', isAuthenticated, catchErrors(getSomeBooks));
router.post('/trade/resolve', isAuthenticated, catchErrors(resolveTrade));

// PUT
router.put('/book/:id', isAuthenticated, catchErrors(updateBook));

// DELETE
router.delete('/book/:id', isAuthenticated, deleteBook);

export default router;