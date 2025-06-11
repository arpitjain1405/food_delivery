const { MenuSection } = require("../models/MenuSection");
const { Restaurant } = require("../models/Restaurant");

const menuSectionOwnership = async (req, res, next) => {
  const menuSection = await MenuSection.findById(req.params.id);
  if (!menuSection) return res.status(404).send("MenuSection not exist");

  const restaurant = await Restaurant.findOne({
    _id: menuSection.restaurant,
    owner: req.user._id,
  });
  if (!restaurant && req.user.role !== 'admin') return res.status(403).send("Unauthorized access");

  req.menuSection = menuSection;
  next();
};

module.exports = menuSectionOwnership;
