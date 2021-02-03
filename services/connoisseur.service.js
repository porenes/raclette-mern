const mongoose = require("mongoose");
const Connoisseur = require("../models/connoisseur");
module.exports = {
  /**
   * Create a new connoisseur
   */
  create: async (connoisseurDTO) => {
    //TODO return errors instead of existing one if already existing
    //check if the connoisser exists
    let potentiallyExisting = await Connoisseur.findOne({
      name: connoisseurDTO.name,
    });
    if (!potentiallyExisting)
      potentiallyExisting = await Connoisseur.findOne({
        email: connoisseurDTO.email,
      });
    if (potentiallyExisting) {
      console.log(
        "Already existing connoisseur with name : " + connoisseurDTO.name
      );
      return potentiallyExisting;
    }
    // create a new connoisseur
    const newConnoisseur = new Connoisseur(connoisseurDTO);
    if (connoisseurDTO.password)
      newConnoisseur.setPassword(connoisseurDTO.password);
    return await newConnoisseur.save();
  },

  /**
   * List all connoisseurs
   */
  list: async () => {
    return await Connoisseur.find();
  },

  findByName: async (name) => {
    return await Connoisseur.findOne({ name });
  },

  findByIds: async (ids) => {
    console.log(ids);
    return await Connoisseur.find({ _id: ids });
  },

  /**
   * Returns a Connoisseur, based on the id provided
   * @param {String} id
   */
  show: async (id) => {
    return await Connoisseur.findById(id);
  },

  /**
   * Woo a connoisseur. If he already wooed you, you become compeers
   * @param {String} wooerId Id of the wooer connoisseur
   * @param {String} wooedId Id of the wooed connoisseur
   */
  woo: async (wooerId, wooedId) => {
    const errors = {};
    if (wooedId && mongoose.isValidObjectId(wooedId)) {
      if (wooerId && mongoose.isValidObjectId(wooerId)) {
        const wooer = await Connoisseur.findByIdAndUpdate(
          wooerId,
          {
            $addToSet: {
              wooeds: wooedId,
            },
          },
          { new: true }
        );
        const wooed = await Connoisseur.findByIdAndUpdate(
          wooedId,
          {
            $addToSet: {
              wooers: wooerId,
            },
          },
          { new: true }
        );

        return { wooer, wooed };
      } else {
        console.error("Connoisseurervice.woo - invalid wooerId : " + wooerId);
        errors.wooerId = "is invalid";
      }
    } else {
      console.error("Connoisseurervice.woo - invalid wooedId : " + wooedId);
      errors.wooedId = "is invalid";
    }
    if (errors.wooedId || errors.wooerId) throw errors;
  },
  /**
   * UN-Woo a connoisseur. If he already wooed you, you become compeers
   * @param {String} wooerId Id of the unwooer connoisseur
   * @param {String} wooedId Id of the unwooed connoisseur
   */
  unwoo: async (unwooerId, unwooedId) => {
    const errors = {};
    if (unwooedId && mongoose.isValidObjectId(unwooedId)) {
      if (unwooerId && mongoose.isValidObjectId(unwooerId)) {
        const unwooer = await Connoisseur.findByIdAndUpdate(
          unwooerId,
          {
            $pull: {
              wooeds: unwooedId,
            },
          },
          { new: true }
        );
        const unwooed = await Connoisseur.findByIdAndUpdate(
          unwooedId,
          {
            $pull: {
              wooers: unwooerId,
            },
          },
          { new: true }
        );

        return { unwooer, unwooed };
      } else {
        console.error("Connoisseurervice.woo - invalid wooerId : " + wooerId);
        errors.wooerId = "is invalid";
      }
    } else {
      console.error("Connoisseurervice.woo - invalid wooedId : " + wooedId);
      errors.wooedId = "is invalid";
    }
    if (errors.wooedId || errors.wooerId) throw errors;
  },
  /**
   * @deprecated Never used
   * ! to be removed
   * @param {*} wooerId
   * @param {*} wooedId
   */
  accept: async (wooerId, wooedId) => {
    const errors = {};
    if (wooedId && mongoose.isValidObjectId(wooedId)) {
      const { wooers } = await Connoisseur.findById(wooedId);
      if (!wooers) throw { wooer: "does not exist or does not have wooers" };
      if (wooerId && mongoose.isValidObjectId(wooerId)) {
        console.log(wooers);
        console.log(wooers.indexOf(wooerId));
        if (!wooers.indexOf(wooerId)) {
          throw { wooer: "did not woo" };
        } else {
          const wooedCompeer = await Connoisseur.findByIdAndUpdate(
            wooedId,
            {
              $addToSet: {
                compeers: wooerId,
              },
              $pull: {
                wooers: wooerId,
              },
            },
            { new: true }
          );
          const wooerCompeer = await Connoisseur.findByIdAndUpdate(
            wooerId,
            {
              $addToSet: {
                compeers: wooedId,
              },
            },
            { returnOriginal: false }
          );
          return { wooerCompeer, wooedCompeer };
        }
      } else {
        console.error("Connoisseurervice.woo - invalid wooerId : " + wooerId);
        errors.wooerId = "is invalid";
      }
    } else {
      console.error("Connoisseurervice.woo - invalid wooedId : " + wooedId);
      errors.wooedId = "is invalid";
    }
    if (errors.wooedId || errors.wooerId) throw errors;
  },

  /**
   * Deletes a Connoiseeur, base on its ID
   * @param {String} id
   */
  delete: async (id) => {
    return await Connoisseur.findByIdAndDelete(id);
  },

  /**
   * Registers a new Connoisseur as a user, and returns an object with jwt token
   * @param {Connoisseur} connoisseurDTO
   */
  register: async (connoisseurDTO) => {
    //TODO manage case when user already exists
    const errors = {};
    if (await Connoisseur.findOne({ name: connoisseurDTO.name })) {
      errors.name = "already exists";
    }
    if (await Connoisseur.findOne({ email: connoisseurDTO.email })) {
      errors.email = "already exists";
    }
    if (errors.name || errors.email) throw errors;
    const finalUser = new Connoisseur(connoisseurDTO);
    finalUser.setPassword(connoisseurDTO.password);
    await finalUser.save();
    return finalUser.toAuthJSON();
  },
  /**
   * Authenticates a user
   * @param {Connoisseur} connoisseurDTO
   */
  authenticate: async (connoisseurDTO) => {
    const passportUser = await Connoisseur.findOne({
      email: connoisseurDTO.email,
    });
    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }
  },
};
