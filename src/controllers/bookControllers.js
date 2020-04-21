const Book = require("../models/book");

exports.createBook = async (req, res) => {
  const { title, genres, author } = req.body;
  const book = await Book.create({
    title: title,
    genres: genres,
    author: author,
  });
  await book.save();
  return res.json({ ok: "ok", data: book });
};
