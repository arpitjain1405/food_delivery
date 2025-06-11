const express = require('express');
const router = express.Router();
const cuisineController = require('../controllers/cuisinecontroller');
const auth = require('../middleware/auth');
const adminsOnly = require('../middleware/adminsOnly');

router.get('/', cuisineController.getAllCuisines);
router.get('/:id', cuisineController.getCuisineById);
router.post('/', auth, adminsOnly, cuisineController.createCuisine);
router.put('/:id', auth, adminsOnly, cuisineController.updateCuisine);
router.delete('/:id', auth, adminsOnly, cuisineController.deleteCuisine);

module.exports = router;