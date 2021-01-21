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

  register: async (connoisseurDTO) => {
    //TODO manage case when user already exists
    const finalUser = new Connoisseur(connoisseurDTO);
    finalUser.setPassword(connoisseurDTO.password);
    await finalUser.save();
    return finalUser.toAuthJSON();
  },
  authenticate: async (connoisseurDTO) => {
    const passportUser = await Connoisseur.findOne({email: connoisseurDTO.email})
    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }
  }
};
