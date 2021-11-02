const User = require("../models/User");
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
  const { name, email, password, type } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      type,
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

module.exports = {
  registerUser,
  authUser,
  logout,
  getUser,
};
