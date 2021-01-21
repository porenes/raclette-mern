"use strict";

const mongoose = require("mongoose");

const dbHandler = require("../config/testDbHandler");
const ConnoisseurService = require("../../services/connoisseur.service");
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
describe("connoisseur create ", () => {
  /**
   * Tests that a valid connoisseur can be created through the connoisseurService without throwing any errors.
   */
  it("can be created correctly", async () => {
    expect(async () => {
      await ConnoisseurService.create(connoisseurComplete);
    }).not.toThrow();
  });

  it("exists after being created", async () => {
    await ConnoisseurService.create(connoisseurComplete);
    const freshConnoisseur = await Connoisseur.findOne();
    expect(freshConnoisseur.name).toBe(connoisseurComplete.name);
  });

  it("cannot be created twice with same name", async () => {
    await ConnoisseurService.create(connoisseurComplete);
    await ConnoisseurService.create(connoisseurComplete);
    const freshConnoisseurs = await Connoisseur.find();
    expect(freshConnoisseurs).toHaveLength(1);
  });
});

describe("connoisseur findByName", () => {
  it("can find an existing connoisseur by name", async () => {
    await Connoisseur.create(connoisseurComplete);
    const foundConnoisseur = await ConnoisseurService.findByName(
      connoisseurComplete.name
    );
    expect(foundConnoisseur.name).toBe(connoisseurComplete.name);
  });
});

describe("Connoisseur show", () => {
  it("can find an existing connoisseur by id", async () => {
    const { _id } = await Connoisseur.create(connoisseurComplete);
    const showman = await ConnoisseurService.show(_id);
    expect(showman.name).toBe(connoisseurComplete.name);
    expect(showman.cheeseLoveRate).toBe(connoisseurComplete.cheeseLoveRate);
    expect(showman.meatEater).toBe(connoisseurComplete.meatEater);
  });
});

describe("Connoisseur delete", () => {
  it("can delete a connoisseur", async () => {
    const {_id} = await Connoisseur.create(connoisseurComplete);
    expect(await Connoisseur.findById(_id)).not.toBeNull();
    await ConnoisseurService.delete(_id);
    expect(await Connoisseur.findById(_id)).toBeNull();
  });
  //TODO
});

describe("Connoisseur register", () => {
  //TODO
});

describe("Connoisseur authenticate", () => {
  //TODO
});

const connoisseurComplete = {
  name: "Jean Cachesex",
  cheeseLoveRate: 5,
  meatEater: true,
  password: "M4nuMonAm0ur",
};
