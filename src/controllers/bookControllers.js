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

exports.readBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ status: "ok", data: books });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "ok",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
