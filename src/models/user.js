const mongoose = require("mongoose");
const validator = require("validator");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(value);
      },
    },
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  tokens: [String],
});

schema.methods.generateToken = async function () {
  const jsonToken = jwt.sign(
    { email: this.email, id: this._id },
    process.env.SECRET
  );
  this.tokens.push(jsonToken);
  await this.save();
  return jsonToken;
};

schema.statics.loginWithCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("User not found");
  const allow = await bcrypt.compare(password.toString(), user.password);
  if (!allow) throw new Error("Password incorrect");
  return user;
};

schema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const User = mongoose.model("User", schema);

module.exports = User;
