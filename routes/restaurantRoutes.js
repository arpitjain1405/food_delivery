const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const auth = require('../middleware/auth');

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', auth, restaurantController.createRestaurant);
router.put('/:id',auth, restaurantController.updateRestaurant);
router.delete(':id', auth, restaurantController.deleteRestaurant);
router.put('/:id/toggleOpening', auth, restaurantController.toggleResOpening);


module.exports = router;