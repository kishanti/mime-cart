const mongoose = require("mongoose");
const { db } = require("../../models");
const { responseModel } = require("../../responses");
var ObjectId = mongoose.Types.ObjectId;
const roleDetails = require("../../constants/roles");

class CommonController {
  constructor() {}

  addRoles = async (req, res) => {
    try {
      let roles;
      for (const role of roleDetails) {
        roles = await db.RoleModel.create({ name: role });
      }
      return responseModel.successResponse("Roles added successfully");
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };

  createAddress = async (req, res) => {
    try {
      const { address, user_id, pin_code, city, state } = req.body;
      const addressDetails = {
        address: address,
        user_id: user_id,
        pin_code: pin_code,
        city: city,
        state: state,
      };
      const createAddress = await db.AddressModel.create(addressDetails);
      if (createAddress) {
        return responseModel.successResponse(
          "address added successfully",
          createAddress
        );
      }
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };
  getAddress = async (req, res) => {
    try {
      const { user_id } = req.body;
      const getAddress = await db.AddressModel.find({ user_id: user_id });
      if (getAddress) {
        return responseModel.successResponse(
          "address get successfully",
          getAddress
        );
      }
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };
  getVendor = async (req, res) => {
    try {
      const findVendor = await db.UserModel.aggregate([
        {
          $lookup: {
            from: "user_roles",
            localField: "_id",
            foreignField: "user_id",
            as: "user_roles",
          },
        },
        {
          $lookup: {
            from: "roles", // Replace with the actual name of the collection storing role details
            localField: "user_roles.role_id",
            foreignField: "_id",
            as: "roles",
          },
        },
        {
          $match: {
            "roles.role_name": "vendor", // Specify the role name you want to filter
          },
        },
        {
          $project: {
            _id: 1, // Include the fields you want
            first_name: 1,
            last_name: 1,
            mobile: 1,
            email: 1,
            profilePic: 1,
          },
        },
      ]);
      if (findVendor) {
        return responseModel.successResponse(
          1,
          "vendor get successfully",
          findVendor
        );
      }
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };
}

module.exports = { CommonController };
