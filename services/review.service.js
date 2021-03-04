const Review = require("../models/review");

module.exports = {
  create: async (reviewDTO) => {
    return await Review.create(reviewDTO);
  },
  read: async (id) => {
    return await Review.findById(id);
  },
  //   update: async (reviewDTO) => {
  //     return;
  //   },
  delete: async (id) => {
    return await Review.findByIdAndDelete(id);
  },
};
