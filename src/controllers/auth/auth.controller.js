const mongoose = require("mongoose");
const { db } = require("../../models");
const { responseModel } = require("../../responses");
var ObjectId = mongoose.Types.ObjectId;

class AuthController {
  constructor() {}

  register = async (req, res) => {
    try {
      const { name, mobile, email, profilePic, password } = req.body;
      const userDetails = {
        name: name,
        mobile: mobile,
        email: email,
        profilePic: profilePic,
        password: password,
      };
      const createCategory = await db.categoryModel.create(userDetails);
      return responseModel.successResponse(
        "user register successfully",
        createCategory
      );
    } catch (error) {
      return responseModel.serverError(
        0,
        "Something went wrong.",
        {},
        errMessage
      );
    }
  };
}

module.exports = { AuthController };
