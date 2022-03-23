const moment = require("moment");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const createUserPlan = async(req, res) => {
    const {name, uid} = req.body;

    try{
        const userExists = await Plan.findOne({ name });

        if (userExists)
            return res.status(400).json({ error: "Plan already exists" });

        const plan = new Plan({
            name,
			user: uid
        });

        await plan.save();

        res.status(201).json({
            id: uid,
            name: name
        });

    }catch(error){
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
	createUserPlan,
    getUserPlans,
    updateUserPlan
}

