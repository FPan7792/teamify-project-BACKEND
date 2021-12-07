//  set les variables d'environnement
require("dotenv").config();

// requetes HTTP
const express = require("express");
// envoyer des données de type "body"
const formidable = require("express-formidable");
// débloquer les requtes cross-origin
const cors = require("cors");
// requetes vers la BDD MONGO
const mongoose = require("mongoose");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// routes pour les requetes reltives à l'utilisateur
const usersRoutes = require("./routes/users");

// routes pour les requetes reltives aux joueurs
const playersRoutes = require("./routes/players");

const teamsRoutes = require("./routes/teams");
// pas encore implémentée

app.use(usersRoutes);
app.use(playersRoutes);

app.use(teamsRoutes);
// pas encore implémentée

//
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(process.env.PORT, () => {
  console.log("Server is now listenning 🎛");
});
