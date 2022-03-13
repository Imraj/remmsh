const express = require("express");
const {
  registerUser,
  authUser,
  logout,
  getUser,
  updateUser,
  updateUserDiscount,
  updateUserActive,
  userCheckCode,
} = require("../controllers/users.js");
const multer = require("multer");
const { auth } = require("../middleware/authMiddleware");
const uploadFilesMiddleware = require("../middleware/upload");

const router = express.Router();


const storage = multer.diskStorage({
	destination: (req, res) => {
		cb(null, 'uploads')
	},
	filename: (req,res) => {
			cb(null, file.fieldname + '-' + Date.now())
	}
});
const upload = multer({storage: storage});

router.post("/register", uploadFilesMiddleware, registerUser);
router.post("/login", authUser);
router.post("/logout", auth, logout);
router.get("/:id", auth, getUser);
router.patch("/:id", auth, updateUser);
router.patch("/:id/discount", auth, updateUserDiscount);
router.patch("/:id/activate", auth, updateUserActive);
router.post("/checkcode", auth, userCheckCode);

//router.post("/create_plan", auth, createUserPlan);
//router.get("/get_user_plans", auth, getUserPlans);
//router.patch("/update_plan/:id", auth, updateUserPlan);

module.exports = router;
