const express = require("express");
const router = express.Router();
const axios = require("axios").default;

// SECURISATION DU MDP
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const token = uid2(16);
const salt = uid2(16);

// =============================>

// MODELE ROUTE USER
const User = require("../models/User");

// envoie de mail automatisé config
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.MAILGUN_DOMAIN,
});

// ROUTE D INSCRIPTION DU USER A L API TEAMIFY
router.post("/user/signup", async (req, res) => {
  try {
    let alert;

    const { username, email, password } = req.fields;

    const verifEmail = await User.findOne({ email });

    if (!verifEmail) {
      const verifUsername = await User.findOne({
        username,
      });

      if (!verifUsername) {
        const newUser = new User({
          email,
          username,
          salt: salt,
          hash: SHA256(password + salt).toString(encBase64),
          token: token,
        });

        await newUser.save();
        console.log("New User saved ");

        // GENERATION D UN FICHIER EQUIPE LIE AU USER EN DTB directement après l creation du compte

        const generateNewTeams = async () => {
          const value = {
            number_of_teams: 1,
            teams: [{ equipe: [], valeur: 0 }],
            user_id: newUser.token,
          };
          console.log(newUser);

          await axios.post("http://process.env.PORT/user/myteams/create", value, {
            headers: {
              Authorization: "Bearer " + newUser.token,
            },
          });
        };
        await generateNewTeams();

        // ENVOIE AUTO D UN MAIL DE CONFIRMATION D INSCRIPTION VIA MAILGUN
        const data = {
          from: `TEAMIFY TEAM <support@teamify.com>`,
          to: email,
          subject: "Welcome on TEAMIFY",
          text: ` 
Hi ${username}, you just registered on TEAMIFY website, welcome to our community !
Here are your authentification datas : 


USERNAME : ${username} 
PASSWORD : ${password}


Hope you'll fully enjoy the API. For now, you can already find and build your team with your favorite active and retired soccer players !
Please note that a lot of features are coming very soon ! We're currently hardly working on that ! 

Enjoy and support us giving your feeling about the API on our GITHUB account : https://github.com/FPan7792/teamify-project ! 

See you very soon ! 🤗`,
        };

        mailgun.messages().send(data, function (error, body) {
          if (!error) {
            console.log("success");
            console.log(body);
          }
          // res.status(401).json(error);
          console.log(error);
        });

        res.status(200).json(newUser);
        console.log(newUser);
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

// CONNEXION DU USER A SON COMPTE
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
