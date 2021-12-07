// middleware d'authentification
// fonctionnalité pas encore implémentée à ce jour

const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    const user = await User.findOne({
      token: req.headers.authorization.replace("Bearer ", ""),
    });

    if (!user) {
      console.log("Unauthorized");
      return res.status(401).send("Unauthorized. The user is not connected");
    } else {
      req.user = user;
      console.log("authorized");

      return next();
    }
  } else {
    console.log("Unauthorized");

    return res
      .status(401)
      .send(
        "Unauthorized. An Authorization header must be sent within the request "
      );
  }
};

module.exports = isAuthenticated;
