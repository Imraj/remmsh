const User = require("../models/User")
const PublicFigure = require("../models/PublicFigure")


const getAllRestaurants = async(req, res) => {

	try{
		
		const restaurants = await User.find({}).populate(
			"publicFigures"
		);;
		
		//console.log("getttingAllRestaurants::::", restaurants)
		res.status(201).json(restaurants);
	}catch(error){
		console.log("errors:::errors", error);
		res.status(500).json({ error: "Something went wrong" });
	}
    

}

const searchRestaurants = async(req, res) => {

	
    var query = req.query.search;
    try{
		const result = await User.find({
							$or: [ 
								{name: query}, 
								{nameAr: query}, 
								{notes: query},
								{district: query},
								{districtAr:query}
							]});
		res.status(200).json(result)
	}catch(error){
		res.status(500).json({ error: "Something went wrong" });
	}
	
}

const editRestaurant = async(req,res) => {
	var id = req.body.id
	try{
		const restaurant = await User.find({_id: id});
		res.status(200).json(restaurant)
	}catch(error){
		res.status(500).json({ error: "Something went wrong" });
	}
}

const updateRestaurant = async(req,res) => {
	var id = req.body.id;
	const {
		name,
		nameAr,
		email,
		type,
		location,
		district,
		districtAr,
		instagram,
		snapchat,
		twitter,
		approved,
		notes,
	} = req.body.data;
	
	try{
		const user = await User.find({_id: id});
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
	    user.notes = req.body.notes || user.notes;
		
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
		  notes: updatedUser.notes
		})
	}catch(error){
		res.status(500).json({ error: "Something went wrong" });
	}
}

const updateRestaurantStatus = async(req,res) => {
	var id = req.body.id;
	var data = req.body.data;
	try{
		const restaurant = await User.find({_id: id});
		restaurant.isActive = data;
		const updatedRestaurant = restaurant.save();
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
		  notes: updatedUser.notes
		})
	}catch(error){
		res.status(500).json({ error: "Something went wrong" });
	}
}

const deleteRestaurant = async(req, res)=>{
	var id = req.body.id
	try{
		const restaurant = await User.find({_id: id});
		restaurant.delete();
		res.status(200).json(restaurant)
	}catch(error){
		res.status(500).json({ error: "Something went wrong" });
	}
}

module.exports = {
    getAllRestaurants,
    searchRestaurants,
	editRestaurant,
	updateRestaurant,
	updateRestaurantStatus,
	deleteRestaurant,
}