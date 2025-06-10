const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getAllRestaurant);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', restaurantController.createRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete(':id', restaurantController.deleteRestaurant);
router.put('/:id/toggleOpening', restaurantController.toggleResOpening);


module.exports = router;