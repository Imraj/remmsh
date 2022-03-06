const moment = require("moment");
const PublicFigure = require("../models/PublicFigure");
const Code = require("../models/Code");
const Credit = require("../models/Credit");
const generateToken = require("../utils/generateToken");

// @desc    Create a new public figure
// @route   POST /api/public-figures
// @access  Private
const createPublicFigure = async (req, res) => {
  const { name } = req.body;

  try {
    const publicFigure = new PublicFigure({
      user: req.user.id,
      name,
    });

    //Save chnages
    await publicFigure.save();

    res.status(201).json(publicFigure);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Get public figures
// @route   get /api/public-figures
// @access  Private
const getPublicFigures = async (req, res) => {
  try {
    const publicFigures = await PublicFigure.find({ user: req.user.id });

    res.status(201).json(publicFigures);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Get public figure
// @route   get /api/public-figures/:id
// @access  Private
const getPublicFigure = async (req, res) => {
  const { id } = req.params;

  try {
    const publicFigure = await PublicFigure.findById(id);

    if (!publicFigure)
      return res.status(400).json({ error: "Public figure does not exists" });

    res.status(201).json(publicFigure);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Update a public figure
// @route   PATCH /api/public-figures/:id
// @access  Private
const updatePublicFigure = async (req, res) => {
  try {
    const publicFigure = await PublicFigure.findById(req.params.id);

    if (!publicFigure.user._id.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Not authorized" });

    publicFigure.name = req.body.name || publicFigure.name;
    publicFigure.isActive = req.body.isActive || publicFigure.isActive;

    const updatedPublicFigure = await publicFigure.save();

    res.status(200).json({
      _id: updatedPublicFigure._id,
      name: updatedPublicFigure.name,
      isActive: updatedPublicFigure.isActive,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Update a public figure discount
// @route   PATCH /api/public-figures/:id/discount
// @access  Private
const updatePublicFigureDiscount = async (req, res) => {
  try {
    const publicFigure = await PublicFigure.findById(req.params.id);

    if (!publicFigure)
      return res.status(404).json({ error: "Public figure not found" });

    if (!publicFigure.user._id.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Not authorized" });

    if (!req.body.discount || !req.body.discountExpireAt)
      return res.status(400).json({ error: "Bad Request" });

    if (parseInt(req.body.discount) <= 0 || parseInt(req.body.discount) > 100)
      return res.status(400).json({ error: "Incorrect discount value" });

    if (
      !moment(req.body.discountExpireAt).isSameOrAfter(
        moment().format("YYYY-MM-DDTHH:mm")
      )
    )
      return res
        .status(400)
        .json({ error: "Date and time can not be greater then now" });

    publicFigure.discount = req.body.discount;
    publicFigure.discountExpireAt = req.body.discountExpireAt;

    const updatedpublicFigure = await updatedpublicFigure.save();

    res.status(200).json({
      _id: updatedpublicFigure._id,
      name: updatedpublicFigure.name,
      isActive: updatedpublicFigure.isActive,
      discount: updatedpublicFigure.discount,
      discountExpireAt: updatedpublicFigure.discountExpireAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Update public figure active
// @route   PATCH /api/public-figures/:id/activate
// @access  Private
const updatePublicFigureActive = async (req, res) => {
  try {
    const publicFigure = await PublicFigure.findById(req.params.id);

    if (!publicFigure)
      return res.status(404).json({ error: "Public figure not found" });

    if (!publicFigure.user._id.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Not authorized" });

    if (!publicFigure.discount)
      return res.status(400).json({ error: "Create discount to be activated" });

    publicFigure.isActive = !publicFigure.isActive;

    if (
      publicFigure.activeTimer &&
      publicFigure.activeTimer < moment().valueOf()
    ) {
      if (publicFigure.isActive) {
        publicFigure.activeTimer = moment().add(1, "day").valueOf();
      }
    }

    if (!publicFigure.activeTimer) {
      if (publicFigure.isActive) {
        publicFigure.activeTimer = moment().add(1, "day").valueOf();
      }
    }

    const updatedPublicFigure = await publicFigure.save();

    res.status(200).json({
      _id: updatedPublicFigure._id,
      name: updatedPublicFigure.name,
      isActive: updatedPublicFigure.isActive,
      discount: updatedPublicFigure.discount,
      discountExpireAt: updatedPublicFigure.discountExpireAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  createPublicFigure,
  getPublicFigures,
  getPublicFigure,
  updatePublicFigure,
  updatePublicFigureDiscount,
  updatePublicFigureActive,
};
