const { responseModel } = require("../responses");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const tokenSecretKey = process.env["JWT_SECRET_" + process.env.RUN_MODE];
const { db } = require("../models");
var ObjectId = mongoose.Types.ObjectId;

// Check Bearer Token and Return Next
const checkBearerToken = async (req, res, next) => {
  const { authorization } = req.headers;
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
  return jwt.verify(token, tokenSecretKey, async (err, decoded) => {
    if (err) {
      return false;
    }
    if (decoded) {
      next();
    }
    return false;
  });
};

//this is for the verify the admin
const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send(0, { error: "Token is require for Access!" });
  }
  try {
    var tokens = req.headers.authorization.replace("Bearer ", "");
    const decode = jwt.verify(tokens, tokenSecretKey);
    const findRole = await db.UserRoleModel.aggregate([
      {
        $match: { user_id: new ObjectId(decode._id) },
      },
      {
        $lookup: {
          from: "roles",
          localField: "role_id",
          foreignField: "_id",
          as: "roles",
        },
      },
      { $unwind: "$roles" },
    ]);
    if (findRole[0].roles.name === "admin") {
      req.headers = decode;
      return next();
    } else {
      return res
        .status(401)
        .send({ error: "you don't have permission to perform this action" });
    }
  } catch (error) {
    return res
      .status(401)
      .send(responseModel.invalidToken(0, { error: "Invalid Token" }));
  }
};
//this is for the verify the vendor
const verifyVendor = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send(0, { error: "Token is require for Access!" });
  }
  try {
    var tokens = req.headers.authorization.replace("Bearer ", "");
    const decode = jwt.verify(tokens, tokenSecretKey);
    const findRole = await db.UserRoleModel.aggregate([
      {
        $match: { user_id: new ObjectId(decode._id) },
      },
      {
        $lookup: {
          from: "roles",
          localField: "role_id",
          foreignField: "_id",
          as: "roles",
        },
      },
      { $unwind: "$roles" },
    ]);
    if (findRole[0].roles.name === "vendor") {
      req.headers = decode;
      return next();
    } else {
      return res
        .status(401)
        .send({ error: "you don't have permission to perform this action" });
    }
  } catch (error) {
    return res
      .status(401)
      .send(responseModel.invalidToken(0, { error: "Invalid Token" }));
  }
};

module.exports = {
  checkBearerToken,
  verifyAdmin,
  verifyVendor,
};
