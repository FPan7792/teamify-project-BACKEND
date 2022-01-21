const express = require("express");
const router = express.Router();

// débloquer les requtes cross-origin
const app = express();
const cors = require("cors");
app.use(cors());

const Team = require("../models/Team.js");
const User = require("../models/User.js");

// CERTIFIE LAUTHENTIFICATION DU USER
const isAuthenticated = require("../middlewares/IsAuthenticated.js");

// APPEL DES EQUIPES DE L USER STOCHEE EN DTB
router.get("/user/myteam", async (req, res) => {
  let alert;

  console.log(req.query);
  const { user_id } = req.query;

  try {
    const findUserTeams = await Team.findOne({ user_id });

    console.log(findUserTeams);

    res.status(200).json(findUserTeams);
    console.log(`Team displayed : ${findUserTeams}`);
  } catch (error) {
    alert = error.message;
    res.status(400).send(alert);
    console.log(alert);
  }
});

// CREATION D UN FICHIER EQUIPES LIE AU USER. ROUTE APPELLEE DES LA CREATION D UN NOUVEL UTILSATEUR
router.post("/user/myteams/create", isAuthenticated, async (req, res) => {
  let alert;

  console.log(req.fields);
  const { number_of_teams, teams, user_id } = req.fields;

  const owner = await User.findOne({ token: user_id });
  console.log(owner);

  try {
    const newTeam = await new Team({
      number_of_teams,
      teams,
      owner,
      user_id,
    });
    console.log("Registering ..");
    await newTeam.save();

    console.log(newTeam);
    res.status(200).json(newTeam);
    console.log("New Team registered ");
  } catch (error) {
    alert = error.message;
    console.log(alert);

    res.status(400).send(alert);
  }
});

// ON MET A JOUR L EQUIPE DE L'UTILISATEUR A CHAQUE AJOUT OU SUPPRESSION DE JOUEUR DANS L EQUIPE
router.put("/user/myteam/update", isAuthenticated, async (req, res) => {
  let alert;

  const { number_of_teams, teams, user_id } = req.fields;

  try {
    const elementToUpdate = await Team.findOne({
      user_id: user_id,
    });

    if (elementToUpdate) {
      console.log("found");
    } else console.log("not found");

    elementToUpdate.number_of_teams = Number(number_of_teams);
    elementToUpdate.teams = teams;

    await elementToUpdate.save();

    res.status(200).json("Team successfully updated" + elementToUpdate);
    console.log("Team successfully updated" + elementToUpdate);
  } catch (error) {
    alert = error.message;
    res.status(400).send(alert);
    console.log(alert);
  }
});

// ROUTES DE SUPPRESSION D'UNE EQUIPE DE L UTILISATEUR. PAS ENCORE IMPLEMENTEE

// router.put("/user/myteam/remove", async (req, res) => {
//   let alert;
//   console.log(req.fields.player);

//   try {
//     await Team.findOneAndRemove({
//       user_id: req.fields.team_index,
//     });

//     res
//       .status(200)
//       .send(`The team ${req.fields.team_name} had been successfully removed`);
//   } catch (error) {
//     alert = error.message;
//     res.status(400).send(alert);
//     console.log(alert);
//   }
// });

module.exports = router;
