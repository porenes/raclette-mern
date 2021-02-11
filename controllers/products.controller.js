const ProductsService = require("../services/products.service");

module.exports = {
  listPopularRaclettes: async (req, res, next) => {
    //TODO handle size
    try {
      const racletteProducts = await ProductsService.listPopularRaclettes()
      
      res.status(200).json(racletteProducts);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
};
