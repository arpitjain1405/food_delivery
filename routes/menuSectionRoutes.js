const express = require('express');
const router = express.Router({ mergeParams: true });
const menuSectionController = require('../controllers/menuSectioncontroller');
const auth = require('../middleware/auth');
const checkRestaurantOwnership = require('../middleware/checkRestaurantOwnership');
const checkMenuSectionOwnership = require('../middleware/checkMenuSectionOwnership');

router.get('/:id', menuSectionController.getMenuSectionById);
router.put('/:id', auth, checkMenuSectionOwnership, menuSectionController.updateMenuSection);
router.delete('/:id', auth, checkMenuSectionOwnership, menuSectionController.deleteMenuSection);

//nested
router.get('/', menuSectionController.getRestaurantAllMenuSections)
router.post('/', auth, checkRestaurantOwnership(), menuSectionController.createMenuSection);

module.exports = router;