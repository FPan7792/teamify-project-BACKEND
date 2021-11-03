// middleware d'authentification
// fonctionnalité pas encore implémentée à ce jour

const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    const user = await User.findOne({
      token: req.headers.authorization.replace("Bearer ", ""),
    });

    if (!user) {
      return res.status(401).send("Unauthorized");
    } else {
      req.user = user;
      return next();
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = isAuthenticated;
