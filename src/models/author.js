const mongoose = require("mongoose");

//create chema
const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
    validate: {
      validator: function (v) {
        return typeof v === "string";
      },
    },
  },
});

// create model schema
const Author = mongoose.model("Author", authorSchema);

//export model
module.exports = Author;
