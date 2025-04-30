const express = require('express');
const router = express.Router();

let books = [];
let idCounter = 1;

// Helper function to validate the year
function isValidYear(year) {
  const yearRegex = /^\d{4}$/;  // Only 4-digit years are valid
  return yearRegex.test(year) && year >= 1000 && year <= 9999;
}

// GET all books
router.get('/', (req, res) => {
  res.json(books);
});

// GET a single book by ID
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST a new book
router.post('/', (req, res) => {
  const { title, author, year, genre } = req.body;

  // Validation: title and author must be non-empty strings
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'Title must be a non-empty string' });
  }
  if (!author || typeof author !== 'string' || author.trim() === '') {
    return res.status(400).json({ message: 'Author must be a non-empty string' });
  }
  
  // Validation: year must be a valid 4-digit year
  if (!year || !isValidYear(year)) {
    return res.status(400).json({ message: 'Year must be a valid 4-digit year' });
  }

  // Create the new book object
  const newBook = {
    id: idCounter++,
    title,
    author,
    year,
    genre: genre || null  // Genre is optional
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) a book by ID
router.put('/:id', (req, res) => {
  const { title, author, year, genre } = req.body;
  const book = books.find(b => b.id === parseInt(req.params.id));

  if (!book) return res.status(404).json({ message: 'Book not found' });

  // Validate: title and author must be non-empty strings
  if (title && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ message: 'Title must be a non-empty string' });
  }
  if (author && (typeof author !== 'string' || author.trim() === '')) {
    return res.status(400).json({ message: 'Author must be a non-empty string' });
  }

  // Validate: year must be a valid 4-digit year
  if (year && !isValidYear(year)) {
    return res.status(400).json({ message: 'Year must be a valid 4-digit year' });
  }

  // Update the book object
  book.title = title || book.title;
  book.author = author || book.author;
  book.year = year || book.year;
  book.genre = genre || book.genre;

  res.json(book);
});
                             
// DELETE a book by ID
router.delete('/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  books.splice(bookIndex, 1);
  res.status(204).end();
});

module.exports = router;
