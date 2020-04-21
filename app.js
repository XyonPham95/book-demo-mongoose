const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  readAuthor,
} = require("./src/controllers/authorControllers");
const {
  createGenre,
  readGenre,
} = require("./src/controllers/genreControllers");
const { createBook } = require("./src/controllers/bookControllers");

mongoose
  .connect(process.env.DB_LOCAL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

router.get("/", (req, res) => {
  return res.status(200).json({ status: "ok", data: [] });
});

router.route("/authors").get(readAuthor).post(createAuthor);

router.delete("/authors/:id", deleteAuthor);
router.put("/authors/:id", updateAuthor);

router.route("/genres").post(createGenre).get(readGenre);

router.route("/books").post(createBook);

app.listen(process.env.PORT, () => {
  console.log("App is running on port", process.env.PORT);
});
