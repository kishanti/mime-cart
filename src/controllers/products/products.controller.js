const mongoose = require("mongoose");
const { db } = require("../../models");
const { responseModel } = require("../../responses");
var ObjectId = mongoose.Types.ObjectId;
const imageUrl = process.env.IMAGE_URL;
console.log(imageUrl);
class ProductController {
  constructor() {}

  create = async (req, res) => {
    try {
      const { name, category_id, description, price, vendor_id } = req.body;
      const imageName = req.files.product_image[0].filename;
      const productDetails = {
        name: name,
        vendor_id: vendor_id,
        product_image: imageName,
        category_id: category_id,
        description: description,
        price: price,
      };
      const createProduct = await db.ProductModel.create(productDetails);
      return responseModel.successResponse(
        1,
        "Product created successfully",
        createProduct
      );
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };

  get = async (req, res) => {
    try {
      const getAllProduct = await db.ProductModel.find();
      return responseModel.successResponse(1, "Product get successfully", {
        getAllProduct,
        imageUrl,
      });
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };

  getById = async (req, res) => {
    try {
      const getProduct = await db.ProductModel.find({ _id: req.params.id });
      return responseModel.successResponse(
        1,
        "Product get successfully",
        getProduct
      );
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };

  delete = async (req, res) => {
    try {
      const deleteProduct = await db.ProductModel.deleteOne({
        _id: req.params.id,
      });
      return responseModel.successResponse(
        1,
        "Product deleted successfully",
        deleteProduct
      );
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };

  update = async (req, res) => {
    try {
      const { name, category_id, description, price, vendor_id } = req.body;
      const { id } = req.params;
      console.log({ id: id });
      let imageName = "";

      const productDetails = {};

      if (req.files.product_image[0].filename) {
        imageName = req.files.product_image[0].filename;
        productDetails.product_image = imageName;
        console.log({ productDetails: productDetails });
      }

      if (name) productDetails.name = name;
      if (category_id) productDetails.category_id = category_id;
      if (description) productDetails.description = description;
      if (price) productDetails.price = price;

      console.log(productDetails);
      const updatedProduct = await db.ProductModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: productDetails },
        { new: true } // Return the updated document
      );
      if (updatedProduct) {
        return responseModel.successResponse(
          1,
          "Product updated successfully",
          updatedProduct
        );
      }
    } catch (error) {
      console.error(error);
      return responseModel.serverError(0, "Something went wrong.");
    }
  };
}

module.exports = { ProductController };
