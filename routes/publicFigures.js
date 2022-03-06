const express = require("express");
const {
  createPublicFigure,
  getPublicFigures,
  getPublicFigure,
  updatePublicFigure,
  updatePublicFigureDiscount,
  updatePublicFigureActive,
} = require("../controllers/publicFigures");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createPublicFigure);
router.get("/", auth, getPublicFigures);
router.get("/:id", auth, getPublicFigure);
router.patch("/:id", auth, updatePublicFigure);
router.patch("/:id/discount", auth, updatePublicFigureDiscount);
router.patch("/:id/activate", auth, updatePublicFigureActive);

module.exports = router;
