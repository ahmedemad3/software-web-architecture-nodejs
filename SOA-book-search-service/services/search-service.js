const express = require('express');
const bodyParser = require('body-parser');

const booksData = require('../books.json');

const app = express();
app.use(bodyParser.json());

app.get('/search', (req, res) => {
  const query = req.query.q;
  const results = booksData.books.filter(
    b =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
  );
  res.json(results);
});

app.listen(4000, () => {
  console.log('Search Service listening on port 4000');
});
