const express = require('express');
const router = express.Router();
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require('../controller/bookController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const upload = require('../middleware/upload'); 

router.post('/books', auth, role(['Admin', 'Author']), upload.single('coverPage'), createBook);
router.get('/books', auth, role(['Admin', 'Author', 'Reader']), getBooks);
router.get('/books/:id', auth, role(['Admin', 'Author', 'Reader']), getBookById);
router.patch('/books/:id', auth, role(['Admin', 'Author']), upload.single('coverPage'), updateBook);
router.delete('/books/:id', auth, role(['Admin']), deleteBook);

module.exports = router;
