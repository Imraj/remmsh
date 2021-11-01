const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
        _id: decoded.id,
        "tokens.token": token,
      }).select("-password");

      if (user) {
        req.user = user;
        req.token = token;
      } else {
        throw new Error();
      }

      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};

// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401).json({ error: "Not authorized, token failed" });
//   }
// };

module.exports = {
  auth,
  //  admin
};
