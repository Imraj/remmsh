const User = require("../models/User")


const getAllRestaurants = async(req, res) => {

    const restaurants = User.find();
    res.status(200).json({restaurants: restaurants});

}

const searchRestaurants = async(req, res) => {

    var query = req.query.search; 
    const result = User.find({name: query});

    res.status(200).json({result: result})

}

module.exports = {
    getAllRestaurants,
    searchRestaurants
}