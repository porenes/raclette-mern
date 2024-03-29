"use strict";

const mongoose = require("mongoose");
const connoisseur = require("../../models/connoisseur");
const ConnoisseurService = require("../../services/connoisseur.service");
const RaclettePartyService = require("../../services/racletteParty.service");

const dbHandler = require("../config/testDbHandler");

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

describe("Raclette party list", () => {
  it("lists all parties", async () => {
    // TODO mock instead of using create
    await RaclettePartyService.create(host1, { date: "2022-02-02" });
    await RaclettePartyService.create(host1, { date: "2022-02-02" });
    await RaclettePartyService.create(host2, { date: "2022-02-02" });
    const foundParties = await RaclettePartyService.list();
    expect(foundParties).toHaveLength(3);
  });
  it("returns an empty list if it's empty", async () => {
    const foundParties = await RaclettePartyService.list();
    expect(foundParties).toHaveLength(0);
  });
  //TODO check if fields are populated
});

describe("Raclette party create", () => {
  it("creates a party for an existing user", async () => {
    const createdHost = await ConnoisseurService.create({ name: "ManuMicron" });
    const newRacletteParty = await RaclettePartyService.create(createdHost, {
      date: "2022-02-02",
    });
    //TODO do not use service and compare objects
    expect(newRacletteParty.host).toStrictEqual(createdHost._id);
  });
});

describe("Raclette party show", () => {
  it("retrieves an existing party", async () => {
    const party = await RaclettePartyService.create(host2, {
      date: "2022-02-02",
    });
    const foundParty = await RaclettePartyService.show(party.id);
    expect(foundParty.id).toBe(party.id);
    expect(foundParty.host).toStrictEqual(party.host);
  });
});

describe("Raclette party addGuests", () => {
  it("adds existing user as guest to an existing party", async () => {
    const party = await RaclettePartyService.create(host2, {
      date: "2022-02-02",
    });
    const updatedParty = await RaclettePartyService.addGuests(party.id, [
      host1._id,
      host3._id,
    ]);
    expect(updatedParty.guests).toContainEqual(host1._id);
    expect(updatedParty.guests).toContainEqual(host3._id);
  });
});

const host1 = new connoisseur({
  _id: new mongoose.Types.ObjectId(),
  name: "Jean Cachesex",
  cheeseLoveRate: 5,
  meatEater: true,
  password: "M4nuMonAm0ur",
});
const host2 = new connoisseur({
  _id: new mongoose.Types.ObjectId(),
  name: "Manu Tango",
  cheeseLoveRate: 2,
  meatEater: false,
  password: "M4nuMonAm0ur",
});
const host3 = new connoisseur({
  _id: new mongoose.Types.ObjectId(),
  name: "Mimi Lafrite",
  cheeseLoveRate: 1,
  meatEater: false,
  password: "M4nuMonAm0ur",
});
