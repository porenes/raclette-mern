"use strict";

const mongoose = require("mongoose");

const dbHandler = require("../config/testDbHandler");
const PostService = require("../../services/post.service");
const Post = require("../../models/post");
const Connoisseur = require("../../models/connoisseur");

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

/**
 * Product create test suite.
 */
describe("post create ", () => {
  /**
   * Tests that a valid connoisseur can be created through the connoisseurService without throwing any errors.
   */
  it("can create a post", async () => {
    expect(async () => {
      await PostService.create(postDTOcreate);
    }).not.toThrow();
    //TODO improve tests
  });
});

describe("post read", () => {
  it("can read a post with a defined Id", async () => {
    const { id } = await Post.create(postDTOcreate);
    const readPost = await PostService.show(id);
    expect(readPost.message).toBe(postDTOcreate.message);
    //TODO improve tests
  });
});

describe.skip("post update", () => {
  it("can update an existing post", async () => {
    //TODO
  });
});

describe("post delete", () => {
  it("can delete a post", async () => {
    const { id } = await Post.create(postDTOcreate);
    expect(await Post.findById(id)).not.toBeNull();
    await PostService.delete(id);
    expect(await Post.findById(id)).toBeNull();
    //TODO improve tests
  });
});

describe("post list", () => {
  it("can list posts", async () => {
    await Post.create(postDTOcreate);
    await Post.create(postDTOcreate2);
    await Post.create(postDTOcreate3);
    const listPosts = await PostService.list();
    expect(listPosts).toHaveLength(3);
  });
});

describe("post like", () => {
  it("can like a post", async () => {
    const { id } = await Post.create(postDTOcreate);
    const { likerId } = await Connoisseur.create(connoisseurDTO);
    const likedPost = await PostService.like(id, likerId);
    expect(likedPost.likers).toHaveLength(1);
  });
  // TODO implement likerId check
  it.skip("cannot like a post if the connoisseur doesn't exist", async () => {
    const { id } = await Post.create(postDTOcreate);
    const likerId = "b2c61de5-b5dd-41e6-98c1-5c4b8ad52602";
    const likedPost = await PostService.like(id, likerId);
    expect(likedPost.likers).toHaveLength(0);
  });
});
describe("post unlike", () => {
  it("can unlike a post", async () => {
    const { id } = await Post.create(postDTOcreate);
    const { likerId } = await Connoisseur.create(connoisseurDTO);
    let likedPost = await PostService.like(id, likerId);
    expect(likedPost.likers).toHaveLength(1); // Just to ensure the like worked
    likedPost = await PostService.unlike(id, likerId);
    expect(likedPost.likers).toHaveLength(0);
  });
  // TODO implement likerId check
  it.skip("cannot like a post if the connoisseur doesn't exist", async () => {
    const { id } = await Post.create(postDTOcreate);
    const { likerId } = await Connoisseur.create(connoisseurDTO);
    let likedPost = await PostService.like(id, likerId);
    expect(likedPost.likers).toHaveLength(1); // Just to ensure the like worked
    const fakelikerId = "b2c61de5-b5dd-41e6-98c1-5c4b8ad52602";
    likedPost = await PostService.unlike(id, fakelikerId);
    expect(likedPost.likers).toHaveLength(1);
  });
});

const postDTOcreate = {
  authorId: "TEST_ID",
  message:
    "This is a normal message for a post, I mean people these days write a lot, add emojis like 🧀. Vitae dolores dolor dolore et praesentium voluptas quo.",
  picture: "http://placeimg.com/640/480/food",
  video: "",
};
const postDTOcreate2 = {
  authorId: "TEST_ID",
  message:
    "This is the second message. Nisi nemo consectetur provident esse. Deserunt expedita corporis officia sed. Nam adipisci aliquam et consequatur. Earum eos atque dolores soluta eaque nulla.",
  picture: "",
  video: "",
};
const postDTOcreate3 = {
  authorId: "TEST_ID",
  message:
    "Eius aut sed adipisci quis aut cum. Voluptas quo et cumque.Error ab dolores. Consequatur consequatur veritatis voluptatem dolores voluptatibus dolores dolores blanditiis. Earum porro voluptatem nisi quisquam repellat est hic deleniti repudiandae.",
  picture: "",
  video: "",
};

const connoisseurDTO = {
  name: "Jean Cachesex",
  cheeseLoveRate: 5,
  meatEater: true,
  password: "M4nuMonAm0ur",
};
