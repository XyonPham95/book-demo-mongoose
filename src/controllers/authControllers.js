const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.loginWithCredentials(email, password);
    const token = await user.generateToken();
    return res.status(200).json({ status: "ok", data: token });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

exports.auth = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    return res.status(401).json({ status: "fail", message: "Unauthorized" });

  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: decoded.id, tokens: token });
    if (!user) throw new Error("Unauthorized");
    req.user = user;
  } catch (err) {
    return res.status(401).json({ status: "fail", message: err.message });
  }
  next();
};

exports.logout = async function (req, res) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    req.user.tokens = req.user.tokens.filter((el) => el !== token);
    await req.user.save();
    res.status(204).json({ status: "logged out success", data: null });
  } catch (err) {
    res.status(401).json({ status: "logged out fail", message: err.message });
  }
};

exports.logoutAll = async function (req, res) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    req.user.tokens = [];
    await req.user.save();
    res.status(204).json({ status: "logged out success", data: null });
  } catch (err) {
    res.status(401).json({ status: "logged out fail", message: err.message });
  }
};
