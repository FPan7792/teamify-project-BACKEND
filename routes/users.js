const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const token = uid2(16);
const salt = uid2(16);

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    let alert;

    const verifEmail = await User.findOne({ email: req.fields.email });

    if (!verifEmail) {
      const verifUsername = await User.findOne({
        username: req.fields.username,
      });

      if (!verifUsername) {
        const newUser = new User({
          email: req.fields.email,
          username: req.fields.username,
          salt: salt,
          hash: SHA256(req.fields.password + salt).toString(encBase64),
          token: token,
        });

        await newUser.save();
        console.log("New User saved ");

        res.status(200).json(newUser);
      } else {
        alert = "Username already taken";
        console.log(alert);
        res.status(400).send(alert);
      }
    } else {
      alert = "This email already has an account";
      console.log(alert);
      res.status(400).send(alert);
    }
  } catch (error) {
    res.status(400).send(error.response);
    console.log(error.message);
  }
});

router.post("/user/login", async (req, res) => {
  let alert;

  try {
    const findUser = await User.findOne({ email: req.fields.email });

    if (findUser) {
      if (
        findUser.hash ===
        SHA256(req.fields.password + findUser.salt).toString(encBase64)
      ) {
        const user = {
          email: findUser.email,
          username: findUser.username,
          token: findUser.token,
          id: findUser._id,
        };
        res.status(200).json(user);
        console.log("User found and displayed");
      } else {
        alert = "Error. Authentification impossible";
        res.status(400).send(alert);
      }
    } else {
      alert = "This email doesn't exist yet";
      res.status(400).send(alert);
      console.log(alert);
    }
  } catch (error) {
    console.log(error.response);
    res.status(400).send(error.message);
  }
});

module.exports = router;
