const mongoose = require("mongoose");
const { db } = require("../../models");
const { responseModel } = require("../../responses");
var ObjectId = mongoose.Types.ObjectId;

class CategoryController {
  constructor() {}
  create = async (req, res) => {
    try {
      const { name } = req.body;
      const isExist = await db.CategoryModel.exists({ name: name });
      if (isExist) {
        return responseModel.badRequest(0, "category already exists");
      }
      const createCategory = await db.CategoryModel.create({ name: name });
      return responseModel.successResponse(
        "category created successfully",
        createCategory
      );
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };

  get = async (req, res) => {
    try {
      const getAllCategory = await db.CategoryModel.find();
      return responseModel.successResponse(1,
        "category get successfully",
        getAllCategory
      );
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };

  delete = async (req, res) => {
    try {
      const deleteCategory = await db.CategoryModel.deleteOne({
        _id: req.params.id,
      });
      return responseModel.successResponse(
        "category deleted successfully",
        deleteCategory
      );
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };
}

module.exports = { CategoryController };
