'use strict';

const mongoose = require('mongoose');

const dbHandler = require('../testDbHandler');
const connoisseurService = require('../../services/connoisseur');
const connoisseurModel = require('../../models/connoisseur');

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
describe('connoisseur create ', () => {
    /**
     * Tests that a valid connoisseur can be created through the connoisseurService without throwing any errors.
     */
    it('can be created correctly', async () => {
        expect(async () => {
            await connoisseurService.create(connoisseurComplete);
        })
            .not
            .toThrow();
    });

    it('exists after being created', async () => {
        await connoisseurService.create(connoisseurComplete);
        const freshConnoisseur = await connoisseurModel.findOne()
        expect(freshConnoisseur.name).toBe(connoisseurComplete.name)

    });

    it('cannot be created twice with same name', async () => {
        await connoisseurService.create(connoisseurComplete);
        await connoisseurService.create(connoisseurComplete);
        const freshConnoisseurs = await connoisseurModel.find()
        expect(freshConnoisseurs).toHaveLength(1)

    });

});

const connoisseurComplete = {
    name: 'Jean Cachesex',
    cheeseLoveRate: 5,
    meatEater: true
};