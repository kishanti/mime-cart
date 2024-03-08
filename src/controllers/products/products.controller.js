const mongoose = require("mongoose");
const { db } = require("../../models");
const { responseModel } = require("../../responses");
var ObjectId = mongoose.Types.ObjectId;

class ProductController {
  constructor() {}

  create = async (req, res) => {
    try {
      const { name, image, category_id, desc, price, vendor_id } = req.body;
      const productDetails = {
        name: name,
        image: image,
        category_id: category_id,
        description: description,
        price: price,
      };
      const data = await db.productModel.create(req.body);
      return responseModel.successResponse(
        "product created successfully",
        data
      );
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };
}

module.exports = { ProductController };
