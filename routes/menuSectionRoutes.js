const express = require('express');
const router = express.Router();
const menuSectionController = require('../controllers/menuSectioncontroller');

router.get('/:id', menuSectionController.getMenuSectionById);
router.put('/:id', menuSectionController.updateMenuSection);
router.delete(':id', menuSectionController.deleteMenuSection);

//nested
router.get('/', menuSectionController.getRestaurantAllMenuSections)
router.post('/', menuSectionController.createMenuSection);

module.exports = router;