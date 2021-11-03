// Modele EQUIPE

const mongoose = require("mongoose");

const Team = mongoose.model("Team", {
  team_name: String,
  team_index: { type: Number, require: true, unique: true },
  team_players: Array,
  team_value: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = Team;
