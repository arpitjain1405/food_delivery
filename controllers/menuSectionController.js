const { MenuSection, validateMenuSection } = require('../models/MenuSection');
const { Restaurant } = require('../models/Restaurant');

exports.getMenuSectionById = async(req, res) => {
    const menuSection = await MenuSection.findById(req.params.id);
    if(!menuSection) return res.status(404).send("MenuSection not exist");
    res.send(menuSection);
}

exports.updateMenuSection = async(req, res) => {
    const { error } = validateMenuSection(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let menuSection = req.menuSection;
    menuSection.title = req.body.title;
    menuSection = await menuSection.save();
    res.send(menuSection);
}

exports.deleteMenuSection = async(req, res) => {
    await MenuSection.deleteOne({ _id: req.params.id })
    
    await MenuItem.deleteMany({ menuSection: req.params.id });

    res.status(200).json({ message: 'Menu section and items deleted successfully' });

}

exports.getRestaurantAllMenuSections = async(req, res) => {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if(!restaurant) return res.status(404).send("No restaurant exist");

    const menuSections = await MenuSection.find({ restaurant: req.params.restaurantId });
    if(!menuSections) return res.status(404).send("No menuSection exist");
    res.send(menuSections);
}

exports.createMenuSection = async(req, res) => {
    const { error } = validateMenuSection(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const existing = await MenuSection.findOne({ restaurant: req.params.restaurantId, title: req.body.title });
    if(existing) return res.status(400).send("menuSection already exist");

    const menuSection = await MenuSection.create({
        title: req.body.title,
        restaurant: req.params.restaurantId
    })
    res.status(201).send(menuSection);

}