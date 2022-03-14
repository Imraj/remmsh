const express = require('express');
const {
    getAllRestaurants,
	editRestaurant,
	updateRestaurant,
	updateRestaurantStatus,
	deleteRestaurant,
    searchRestaurants,
	fetchImageBins
} = require("../controllers/restaurants.js")

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:id', editRestaurant);
router.patch('/:id', updateRestaurant);
router.patch('/:id/status', updateRestaurantStatus);
router.delete('/:id', deleteRestaurant);
router.get('/search', searchRestaurants);
router.get('/images', fetchImageBins);

module.exports = router;