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
let fs = require('fs-extra');
const { auth } = require("../middleware/authMiddleware");
const uploadFilesMiddleware = require("../middleware/upload");


const router = express.Router();


/*const storage = multer.diskStorage({
	destination: (req, res) => {
		cb(null, 'uploads')
	},
	filename: (req,res) => {
			cb(null, file.fieldname + '-' + Date.now())
	}
});
const upload = multer({storage: storage});*/



let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let path = `uploads`;
		fs.mkdirsSync(path);
		cb(null, path);
	},
	filename: function (req, file, cb) {
		let extArray = file.mimetype.split("/");
		let extension = extArray[extArray.length - 1];
		cb(null, Date.now() + "." + extension);
	}
});
const upload = multer({ storage: storage }).array("image[]", 15);

router.post("/register", upload, registerUser);
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
