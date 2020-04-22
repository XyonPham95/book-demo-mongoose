const Genre = require("../models/genre");

exports.createGenre = async (req, res) => {
  try {
    const genre = await Genre.create({ genre: req.body.genre });
    return res.status(201).json({ status: "ok", data: genre });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

exports.readGenres = async (req, res) => {
  try {
    const genre = await Genre.find();
    res.status(200).json({
      status: "ok",
      data: genre,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
