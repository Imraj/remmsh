const User = require("../models/User")
const PublicFigure = require("../models/PublicFigure")


const getAllRestaurants = async(req, res) => {

	try{
		
		const restaurants = await User.find({isActive: true}).populate("publicFigures");
		
		//console.log("getttingAllRestaurants::::", restaurants)
		res.status(201).json(restaurants);
	}catch(error){
		console.log("errors:::errors", error);
		res.status(500).json({ error: "Something went wrong" });
	}
    
}

const adminGetAllRestaurants = async(req, res) => {

	try{
		
		const restaurants = await User.find({}).populate("publicFigures");
		
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
	var id = req.params.id
	try{
		const restaurant = await User.find({_id: id});
		res.status(200).json(restaurant)
	}catch(error){
		res.status(500).json({ error: "Something went wrong" });
	}
}

const updateRestaurant = async(req,res) => {
	
	var id = req.params.id;
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
		images
	} = req.body;
	
	try{
		const user = await User.findById(req.params.id);
		user.name = name;
		user.nameAr = nameAr;
		user.email = email;
		user.type = type;
		user.location = location;
		user.instagram = instagram;
		user.snapchat = snapchat;
		user.twitter = twitter;
	    user.notes = notes;
		user.images = images || user.images;
		
		const updatedUser = await user.save();
		res.status(200).json({
		  _id: updatedUser._id,
		  name: updatedUser.name,
		  nameAr: updatedUser.nameAr,
		  type: updatedUser.type,
		  email: updatedUser.email,
		  isActive: updatedUser.isActive,
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
	var id = req.params.id;
	console.log("ID::req.params.id")
	try{
		const restaurant = await User.findById(req.params.id);
		restaurant.isActive = !restaurant.isActive;
		const updatedUser = restaurant.save();
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
	try{
		const restaurant = await User.findById(req.params.id);
		restaurant.delete();
		res.status(200).json(restaurant)
	}catch(error){
		res.status(500).json({ error: "Something went wrong" });
	}
}

const deactivateRestaurant = async(req, res)=>{
	
	try{
		const restaurant = await User.findById(req.params.id);
		restaurant.isActive = false
		restaurant.save();
		res.status(200).json(restaurant)
	}catch(error){
		res.status(500).json({ error: "Something went wrong" });
	}
}

const fetchImageBins = async(req,res)=>{
	
	let images = req.body.images;
	console.log("fetchImageBins::", images);
	
	
    try{
		//let bins = []
		/*images.forEach((img)=>{
			let bin = photos.chunks.find({file_id: img});
			bins.push(bin);
		})*/
		res.status(200).json({success: "Hello World"})
	}catch(error){
		res.status(500).json({ hi: "HelloWorld",error: "Something went wrong", msg: error });
	}
	
}

module.exports = {
    getAllRestaurants,
	adminGetAllRestaurants,
    searchRestaurants,
	fetchImageBins,
	editRestaurant,
	updateRestaurant,
	updateRestaurantStatus,
	deleteRestaurant,
	deactivateRestaurant
}