//  FONCTIONNALITE Non Implémentée à ce jour

// const express = require("express");
// const router = express.Router();

// const Team = require("../models/Team.js");
// const isAuthenticated = require("../middlewares/IsAuthenticated.js");

// // Insatller le middleware pour les routes en PUT
// router.post("/user/myteam/create", async (req, res) => {
//   let alert;

//   console.log("Trying to register team number: " + req.fields.team_index);
//   console.log(req.fields);
//   try {
//     const verification = await Team.findOne({
//       team_name: req.fields.team_name,
//     });

//     if (!verification) {
//       const newTeam = await new Team({
//         team_name: req.fields.team_name,
//         team_index: req.fields.team_index,
//         team_players: {
//           player1: {
//             name: req.fields.player1_name,
//             last_name: req.fields.player1_lastname,
//             value: req.fields.player1_value,
//           },
//           player2: {
//             name: req.fields.player2_name,
//             last_name: req.fields.player2_lastname,
//             value: req.fields.player2_value,
//           },
//           player3: {
//             name: req.fields.player3_name,
//             last_name: req.fields.player3_lastname,
//             value: req.fields.player3_value,
//           },
//           player4: {
//             name: req.fields.player4_name,
//             last_name: req.fields.player4_lastname,
//             value: req.fields.player4_value,
//           },
//           player5: {
//             name: req.fields.player5_name,
//             last_name: req.fields.player5_lastname,
//             value: req.fields.player5_value,
//           },
//           player6: {
//             name: req.fields.player6_name,
//             last_name: req.fields.player6_lastname,
//             value: req.fields.player6_value,
//           },
//           player7: {
//             name: req.fields.player7_name,
//             last_name: req.fields.player7_lastname,
//             value: req.fields.player7_value,
//           },
//           player8: {
//             name: req.fields.player8_name,
//             last_name: req.fields.player8_lastname,
//             value: req.fields.player8_value,
//           },
//           player9: {
//             name: req.fields.player9_name,
//             last_name: req.fields.player9_lastname,
//             value: req.fields.player9_value,
//           },
//           player10: {
//             name: req.fields.player10_name,
//             last_name: req.fields.player10_lastname,
//             value: req.fields.player10_value,
//           },
//           player11: {
//             name: req.fields.player11_name,
//             last_name: req.fields.player11_lastname,
//             value: req.fields.player11_value,
//           },
//         },
//         owner: req.fields.owner,
//       });
//       console.log("Registering ..");
//       await newTeam.save();

//       console.log(newTeam);
//       res.status(200).json(newTeam);
//       console.log("New Team registered ");
//     } else {
//       alert = "This team is already registered";
//       console.log(alert);
//       res.status(400).send(alert);
//     }
//   } catch (error) {
//     alert = error.message;
//     console.log(alert);

//     res.status(400).send(alert);
//   }
// });

// router.put("/user/myteam/update", async (req, res) => {
//   let alert;
//   try {
//     const elementToUpdate = await Team.findOne({
//       team_name: req.fields.team_name,
//     });

//     (elementToUpdate.team_name = req.fields.team_name),
//       (elementToUpdate.team_players = req.fields.team_players),
//       (elementToUpdate.team_value = req.fields.team_value),
//       await elementToUpdate.save();

//     res.status(200).json("Team successfully updated" + elementToUpdate);
//     console.log("Team successfully updated" + elementToUpdate);
//   } catch (error) {
//     alert = error.message;
//     res.status(400).send(alert);
//     console.log(alert);
//   }
// });

// router.put("/user/myteam/remove", async (req, res) => {
//   let alert;
//   console.log(req.fields);

//   try {
//     await Team.findOneAndRemove({
//       team_index: req.fields.team_index,
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

// router.get("/user/myteam", async (req, res) => {
//   let alert;

//   try {
//     const findTeam = await Team.find();

//     res.status(200).json(findTeam);
//     console.log(`Team displayed : ${findTeam}`);
//   } catch (error) {
//     alert = error.message;
//     res.status(400).send(alert);
//     console.log(alert);
//   }
// });

// module.exports = router;
