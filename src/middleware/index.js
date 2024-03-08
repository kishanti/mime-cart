const { responseModel } = require("../responses");
const jwt = require("jsonwebtoken");
const tokenSecretKey = process.env["JWT_SECRET_" + process.env.RUN_MODE];
const tokenAlgorithm = process.env["JWT_ALGORITHM"];

// Check Bearer Token and Return Next
const checkBearerToken = async (req, res, next) => {
  const {authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .send(responseModel.invalidToken(0, "No token provided"));
  }
  const parts = authorization.split(" ");
  if (parts.length != 2) {
    return res.status(401).send(responseModel.invalidToken(0, "Token error"));
  }
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .send(responseModel.invalidToken(0, "Token malformatted"));
  }
  return jwt.verify(token, tokenSecretKey, async (err, decoded) => {
    if (err) {
      return false;
    }
    if (decoded) {
      req.headers.userDetails = decoded;
      req.headers.expireTime = decoded.iat;
      return true;
    }
    return false;
  });
};

module.exports = {
  checkBearerToken,
};
