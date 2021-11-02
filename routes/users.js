const express = require("express");
const {
  registerUser,
  authUser,
  logout,
  getUser,
  updateUser,
  updateUserDiscount,
  updateUserActive,
} = require("../controllers/users.js");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", auth, logout);
router.get("/:id", auth, getUser);
router.patch("/:id", auth, updateUser);
router.patch("/:id/discount", auth, updateUserDiscount);
router.patch("/:id/activate", auth, updateUserActive);

module.exports = router;
