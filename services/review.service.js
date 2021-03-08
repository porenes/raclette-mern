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
  listByProduct: async (productId, pageSize = 10, page = 1) => {
    return await Review.find({ productId })
      .sort({ createAt: "desc" })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
  },
};
