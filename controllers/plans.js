const moment = require("moment");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const Plan = require("../models/Plan");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const addUserPlan = async(req, res) => {
    const {name} = req.params;

    try{

        const userExists = await Plan.findOne({ name });
        console.log("userExists::", userExists)
        console.log("req.body:::", req.body);

        if (userExists)
            return res.status(400).json({ error: "Plan already exists" });

        const user = new User({
            name,
        });

        await user.save();

        res.status(201).json({
            _id: user._id,
            name: user.name,
            token,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }

}

// @desc    Get user plans
// @route   get /api/users/:id/plans
// @access  Public
const getUserPlans = async(req, res) => {
    const { id } = req.params;
    try{
        const userPlans = await Plan.find({user: id});
  
        if (!userPlans) return res.status(400).json({ error: "User does not exists" });
  
        res.status(201).json(userPlans);
  
    } catch(error) {
      res.status(500).json({ error: "Something went wrong" });
    }
}

// @desc    Update a user plan
// @route   PATCH /api/users/:id/plans/:id/
// @access  Public
const updateUserPlan = async(req,res) => {
  
    try {
      if (req.params.id.toString() !== req.user._id.toString())
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
  
      const user = await User.findById(req.params.id);
  
      if (!user) return res.status(404).json({ error: "User not found" });
  
      user.discount = req.body.discount;
      user.discountExpireAt = req.body.discountExpireAt;
  
      const updatedUser = await user.save();
  
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        isActive: updatedUser.isActive,
        discount: updatedUser.discount,
        discountExpireAt: updatedUser.discountExpireAt,
        link: updatedUser.link,
      });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  
}

module.exports = {
    getUserPlans,
    updateUserPlan
}

