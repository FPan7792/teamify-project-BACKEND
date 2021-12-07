// Modele EQUIPES

const mongoose = require("mongoose");

const UserTeams = mongoose.model("User_Team", {
  number_of_teams: Number,
  user_id: String,
  teams: Array,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = UserTeams;
