const mongoose = require("mongoose");
const { db } = require("../../models");
const { responseModel } = require("../../responses");

class CategoryController {
  constructor() {}

  create = async (req, res) => {
    try {
      const { name } = req.body;
      const createCategory = await db.categoryModel.create(req.body);
      return responseModel.successResponse(
        "category created successfully",
        createCategory
      );
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };
}

module.exports = { CategoryController };
