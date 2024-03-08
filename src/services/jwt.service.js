require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretOrPrivateKey = process.env["JWT_SECRET_" + process.env.RUN_MODE];
const jwtSignOptions = {
  algorithm: process.env["JWT_ALGORITHM_" + process.env.RUN_MODE],
  expiresIn: process.env["JWT_TOKEN_LIFE_" + process.env.RUN_MODE],
  issuer: process.env["JWT_ISSUER_" + process.env.RUN_MODE],
};

const generateToken = async (payload) => {
  const token = jwt.sign(payload, secretOrPrivateKey, jwtSignOptions);
  return token;
};

const verifyJsonWebToken = async (token) => {
  const xyz = await jwt.verify(token, secretOrPrivateKey);
  return xyz;
};

module.exports = { generateToken, verifyJsonWebToken };
