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
  readGenres,
} = require("./src/controllers/genreControllers");
const {
  createBook,
  readBook,
  deleteBook,
} = require("./src/controllers/bookControllers");
const { createUser } = require("./src/controllers/userControllers");
const {
  login,
  auth,
  logout,
  logoutAll,
} = require("./src/controllers/authControllers");
const {
  createReview,
  readReviews,
} = require("./src/controllers/reviewControllers");
const validateBook = require("./src/middlewares/checkBook");

mongoose
  .connect(process.env.DB_LOCAL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

router.get("/", (req, res) => {
  return res.status(200).json({ status: "ok", data: [] });
});

router.route("/authors").get(readAuthor).post(createAuthor);
router.delete("/authors/:id", deleteAuthor);
router.put("/authors/:id", updateAuthor);

router.route("/genres").post(createGenre).get(readGenres);

router
  .route("/books/:bId/reviews")
  .post(auth, validateBook, readReviews)
  .get(auth, validateBook, createReview);

router.route("/books").get(readBook).post(createBook);
router.delete("/books/:id", deleteBook);

router.route("/users").post(createUser);

router.route("/auth/login").post(login);

router.get("/auth/logout", auth, logout);
router.get("/auth/allout", auth, logoutAll);

app.listen(process.env.PORT, () => {
  console.log("App is running on port", process.env.PORT);
});
