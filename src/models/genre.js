const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  genre: {
    type: String,
    required: [true, "genre name is required"],
    trime: true,
    unique: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
