const express = require('express');
const bodyParser = require('body-parser');

const booksData = require('../books.json');

const app = express();
app.use(bodyParser.json());

app.get('/books', (req, res) => {
  res.json(booksData.books);
});

app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = booksData.books.find(b => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.listen(3000, () => {
  console.log('Book Service listening on port 3000');
});
