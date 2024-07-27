const Book = require('../models/books');
const path = require('path');
const fs = require('fs');
const createBook = async (req, res) => {
    try {
        const coverPageURL = req.file ? `/uploads/${req.file.filename}` : req.body.coverPage;
    
        const book = new Book({
          title: req.body.title,
          author: req.body.author,
          coverPage: coverPageURL, // Use the file path saved by multer
          year: req.body.year
        });
    
        await book.save();
        res.status(201).send(book);
      } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
      }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (error) {
    res.status(500).send();
  }
};

const getBookById = async (req, res) => {
  const _id = req.params.id;
  try {
    const book = await Book.findById(_id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
};

const updateBook = async (req, res) => {
    try {
        const updates = { ...req.body };
    
        if (req.file) {
          updates.coverPage = `/uploads/${req.file.filename}`;
        }
    
        const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });
    
        if (!book) {
          return res.status(404).send();
        }
    
        res.send(book);
      } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
      }
    };

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
};
