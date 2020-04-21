const mongoose = require("mongoose");

//create chema
const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
  },
});

// create model schema
const Author = mongoose.model("Author", authorSchema);

//export model
module.exports = Author;
