const { Restaurant } = require("../models/Restaurant");

const checkRestaurantOwnership = function (paramsName = 'restaurantId') {
  return async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params[paramsName]);
    if (!restaurant) return res.status(404).send("Restaurant not found");

    if (
      restaurant.owner.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).send("Access denied.");
    }
    req.restaurant = restaurant;
    next();
  };
};
module.exports = checkRestaurantOwnership;
