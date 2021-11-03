// Modele utilisateur

const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  username: String,
  password: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
