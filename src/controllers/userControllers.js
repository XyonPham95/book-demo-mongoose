const User = require("../models/user");

exports.createUser = async function (req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    return res.status(201).json({ status: "ok", data: user });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

exports.readUser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.user._id });
    console.log(user);
    return res.status(200).json({ status: "ok", data: user });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.readUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ status: true, data: user });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, email: req.body.email },
      { new: true }
    );
    return res.status(200).json({ status: "ok", data: user });
  } catch (err) {
    return res.status(400).json({ status: "fail", data: err.message });
  }
};
