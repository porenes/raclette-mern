const Connoisseur = require("../models/connoisseur");
module.exports = {
  /**
   * Create a new connoisseur
   */
  create: async (connoisseurDTO) => {
    //check if the connoisser exists
    const potentiallyExisting = await Connoisseur.findOne({
      name: connoisseurDTO.name,
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

  /**
   * Returns a Connoisseur, based on the id provided
   * @param {String} id
   */
  show: async (id) => {
    return await Connoisseur.findById(id);
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
