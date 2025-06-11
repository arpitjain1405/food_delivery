const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const auth = require('../middleware/auth');
const menuSectionRoutes = require('../routes/menuSectionRoutes');
const checkRestaurantOwnership = require('../middleware/checkRestaurantOwnership');

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', auth, restaurantController.createRestaurant);
router.put('/:id',auth, checkRestaurantOwnership('id'), restaurantController.updateRestaurant);
router.delete('/:id', auth, checkRestaurantOwnership('id'), restaurantController.deleteRestaurant);
router.put('/:id/toggleOpening', auth, checkRestaurantOwnership('id'), restaurantController.toggleResOpening);

router.use('/:restaurantId/menuSections', menuSectionRoutes);

module.exports = router;