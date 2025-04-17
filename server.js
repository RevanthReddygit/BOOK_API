const express = require('express');
const app = express();
const booksRouter = require('./routes/books');

app.use(express.json()); // Middleware to parse JSON
app.use('/api/books', booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
