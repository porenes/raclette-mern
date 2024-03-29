"use strict";

const mongoose = require("mongoose");
const faker = require("faker");

const dbHandler = require("../config/testDbHandler");
const Connoisseur = require("../../models/connoisseur");
const Review = require("../../models/review");
const ReviewService = require("../../services/review.service");
const { fake } = require("faker");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await dbHandler.connect();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe("create review", () => {
  it("can create a review", async () => {
    expect(async () => {
      await ReviewService.create(reviewDTO_1);
    }).not.toThrow();
  });
  it("can create a review with all fields", async () => {
    const newReview = await ReviewService.create(reviewDTO_1);
    expect(newReview.productId).toEqual(reviewDTO_1.productId);
    expect(newReview.priceRate).toEqual(reviewDTO_1.priceRate);
    expect(newReview.tasteRate).toEqual(reviewDTO_1.tasteRate);
    expect(newReview.tasteComment).toEqual(reviewDTO_1.tasteComment);
    expect(newReview.textureRate).toEqual(reviewDTO_1.textureRate);
    expect(newReview.textureComment).toEqual(reviewDTO_1.textureComment);
    expect(newReview.totalComment).toEqual(reviewDTO_1.totalComment);
    expect(newReview.totalRate).toEqual(reviewDTO_1.totalRate);
    expect(newReview.reviewer).toEqual(fakeId);
  });
});
describe("read review", () => {
  it("can read a review", async () => {
    const { _id } = await Review.create(reviewDTO_1);
    expect(async () => {
      await ReviewService.read(_id);
    }).not.toThrow();
  });
  it("can read a review with all fields", async () => {
    const { _id } = await Review.create(reviewDTO_1);
    const readReview = await ReviewService.read(_id);
    expect(readReview.productId).toEqual(reviewDTO_1.productId);
    expect(readReview.priceRate).toEqual(reviewDTO_1.priceRate);
    expect(readReview.tasteRate).toEqual(reviewDTO_1.tasteRate);
    expect(readReview.tasteComment).toEqual(reviewDTO_1.tasteComment);
    expect(readReview.textureRate).toEqual(reviewDTO_1.textureRate);
    expect(readReview.textureComment).toEqual(reviewDTO_1.textureComment);
    expect(readReview.totalComment).toEqual(reviewDTO_1.totalComment);
    expect(readReview.totalRate).toEqual(reviewDTO_1.totalRate);
    expect(readReview.reviewer).toEqual(fakeId);
  });
});

describe("delete review", () => {
  it("can delete a review", async () => {
    const { _id } = await Review.create(reviewDTO_1);
    await ReviewService.delete(_id);
    expect(await Review.findById(_id)).toBeNull();
  });
});

describe("list by product", () => {
  beforeEach(async () => {
    for (let i = 0; i < 20; i++) {
      await Review.create(randomReviewDTO());
    }
    for (let i = 0; i < 20; i++) {
      await Review.create(randomReviewDTO(reviewDTO_1.productId));
    }
  });
  it("can list 10 reviews for an existing product", async () => {
    const reviewList = await ReviewService.listByProduct(reviewDTO_1.productId);
    expect(reviewList).not.toBeNull();
    expect(reviewList).not.toHaveLength(0);
    expect(reviewList).toHaveLength(10);
  });
  it("doesn't list any review if the product has no review", async () => {
    expect(await ReviewService.listByProduct("fake_product_id")).toHaveLength(
      0
    );
  });
  it("can manage pagination", async () => {
    const reviewList = await ReviewService.listByProduct(
      reviewDTO_1.productId,
      15,
      1
    );
    expect(reviewList).toHaveLength(15);
    const nextPageReviewList = await ReviewService.listByProduct(
      reviewDTO_1.productId,
      15,
      2
    );
    expect(nextPageReviewList).toHaveLength(5);
  });
});

const fakeId = new mongoose.Types.ObjectId();
const reviewDTO_1 = {
  productId: "123456788",
  priceRate: 4,
  tasteRate: 1,
  tasteComment:
    "Quia eveniet rerum voluptatibus sit fugiat quis culpa consectetur.",
  textureRate: 3,
  textureComment: "Aut id quae aspernatur beatae itaque corporis.",
  totalComment: "Aut cupiditate voluptas officia error commodi id.",
  totalRate: 5,
  reviewer: fakeId,
};

const randomReviewDTO = (
  productId = faker.random.uuid(),
  reviewer = new mongoose.Types.ObjectId()
) => {
  return {
    productId,
    priceRate: faker.random.number({
      min: 0,
      max: 5,
    }),
    tasteRate: faker.random.number({
      min: 0,
      max: 5,
    }),
    tasteComment: faker.lorem.sentence(),
    textureRate: faker.random.number({
      min: 0,
      max: 5,
    }),
    textureComment: faker.lorem.sentence(),
    totalComment: faker.lorem.sentence(),
    totalRate: faker.random.number({
      min: 0,
      max: 5,
    }),
    reviewer,
  };
};
