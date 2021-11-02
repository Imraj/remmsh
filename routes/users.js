const express = require("express");
const {
  registerUser,
  authUser,
  logout,
  getUser,
} = require("../controllers/users.js");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", auth, logout);
router.get("/:id", auth, getUser);

module.exports = router;
