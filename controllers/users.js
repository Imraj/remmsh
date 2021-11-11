const User = require("../models/User");
const Code = require("../models/Code");
const generateToken = require("../utils/generateToken");

// @desc    Auth User
// @route   POST /api/users/admin/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User does not exist" });

    const isCorrectPassword = await user.matchPassword(password);

    if (!isCorrectPassword)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken(user._id);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const {
    name,
    nameAr,
    email,
    password,
    type,
    location,
    instagram,
    snapchat,
    twitter,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    const user = await User.create({
      name,
      nameAr,
      email,
      password,
      type,
      location,
      instagram,
      snapchat,
      twitter,
    });

    const token = generateToken(user._id);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Get user
// @route   get /api/users/:id
// @access  Private
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select(
      "-password -tokens -createdAt -updatedAt"
    );

    if (!user) return res.status(400).json({ error: "User does not exists" });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Logout user
// @route   POST /api/logout
// @access  Public
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Update a user
// @route   PATCH /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    if (req.params.id.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Not authorized" });

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = req.body.name || user.name;
    user.nameAr = req.body.nameAr || user.nameAr;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.type = req.body.type || user.type;
    user.isActive = req.body.isActive || user.isActive;
    user.location = req.body.location || user.location;
    user.discount = req.body.discount || user.discount;
    user.instagram = req.body.instagram || user.instagram;
    user.snapchat = req.body.snapchat || user.snapchat;
    user.twitter = req.body.twitter || user.twitter;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      nameAr: updatedUser.nameAr,
      type: updatedUser.type,
      phone: updatedUser.phone,
      email: updatedUser.email,
      isActive: updatedUser.isActive,
      discount: updatedUser.discount,
      location: updatedUser.location,
      instagram: updatedUser.instagram,
      snapchat: updatedUser.snapchat,
      twitter: updatedUser.twitter,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Update user discount
// @route   PATCH /api/users/:id/discount
// @access  Private
const updateUserDiscount = async (req, res) => {
  try {
    if (req.params.id.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Not authorized" });

    if (!req.body.discount)
      return res.status(400).json({ error: "Bad Request" });

    if (parseInt(req.body.discount) <= 0 || parseInt(req.body.discount) > 100)
      return res.status(400).json({ error: "Incorrect discount value" });

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.discount = req.body.discount;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      nameAr: updatedUser.nameAr,
      type: updatedUser.type,
      phone: updatedUser.phone,
      email: updatedUser.email,
      isActive: updatedUser.isActive,
      discount: updatedUser.discount,
      location: updatedUser.location,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    Update user active
// @route   PATCH /api/users/:id/activate
// @access  Private
const updateUserActive = async (req, res) => {
  try {
    if (req.params.id.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Not authorized" });

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.discount)
      return res.status(400).json({ error: "Create discount to be activated" });

    user.isActive = !user.isActive;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      nameAr: updatedUser.nameAr,
      type: updatedUser.type,
      phone: updatedUser.phone,
      email: updatedUser.email,
      isActive: updatedUser.isActive,
      discount: updatedUser.discount,
      location: updatedUser.location,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    user check code
// @route   PATCH /api/users/checkcode
// @access  Private
const userCheckCode = async (req, res) => {
  try {
    const code = await Code.findOne({
      user: req.user._id,
      code: req.body.code,
    });

    if (!code) return res.status(404).json({ error: "Code is invalid" });

    await code.remove();

    //Update to total activation
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $inc: { totalActivation: 1 } }
    );

    res.status(200).json(code);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  registerUser,
  authUser,
  logout,
  getUser,
  updateUser,
  updateUserDiscount,
  updateUserActive,
  userCheckCode,
};
