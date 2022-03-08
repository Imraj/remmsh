const express = require('express');
const {
    getAllRestaurants,
    searchRestaurants
} = require("../controllers/restaurants.js")

const router = express.Router();

router.post('/restaurants', getAllRestaurants);
router.post('/search', searchRestaurants);