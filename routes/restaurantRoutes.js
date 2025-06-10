const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const auth = require('../middleware/auth');
const menuSectionRoutes = require('../routes/menuSectionRoutes');

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', auth, restaurantController.createRestaurant);
router.put('/:id',auth, restaurantController.updateRestaurant);
router.delete(':id', auth, restaurantController.deleteRestaurant);
router.put('/:id/toggleOpening', auth, restaurantController.toggleResOpening);

router.use('/:restaurantId/menuSections', menuSectionRoutes);

module.exports = router;