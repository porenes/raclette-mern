const { mongo } = require("mongoose");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
// TODO do not display salt and hash when querying
const ConnoisseurSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    cheeseLoveRate: { type: Number, min: 0, max: 5, default: 3 },
    meatEater: { type: Boolean, default: true },
    email: { type: String, unique: true },
    hash: { type: String, select: false },
    salt: { type: String, select: false },
  },
  { timestamps: true }
);

/**
 * Creates a salt and saves a hashed version of the password
 * @param {String} password The password of the user
 */
ConnoisseurSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

/**
 * Validates a provided password against the hashed version stored
 * @param {String} password
 */
ConnoisseurSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};
/**
 * Generates a jwt token
 */
ConnoisseurSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    "secret"
  );
  // TODO change secret and move it to ENV
};
/**
 * Returns and object after auth
 */
ConnoisseurSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model("Connoisseur", ConnoisseurSchema);
