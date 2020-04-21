const mongoose = require("mongoose");
const Genre = require("./genre");
const Author = require("./author");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  genres: Array,
  authors: Object,
});

schema.pre("save", async function (next) {
  this.author = await Author.findById(this.author);
  const genreArr = this.genres.map(async (el) => await Genre.findById(el));
  this.genres = await Promise.all(genreArr);
  next();
});

const Book = mongoose.model("Book", schema);

module.exports = Book;
