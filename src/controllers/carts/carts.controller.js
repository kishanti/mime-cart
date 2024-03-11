const mongoose = require("mongoose");
const { db } = require("../../models");
const { responseModel } = require("../../responses");
var ObjectId = mongoose.Types.ObjectId;

class CartController {
  constructor() {}

  addToCart = async (req, res) => {
    try {
      const { user_id, product_id, quantity, net_amount } = req.body;
      const cartDetails = {
        user_id: user_id,
        product_id: product_id,
        quantity: quantity,
        net_amount: net_amount,
      };
      const addToCart = await db.CartModel.create(cartDetails);
      if (addToCart) {
        return responseModel.successResponse("Item added to cart", addToCart);
      }
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };

  updateCart = async (req, res) => {
    try {
      const { cart_id } = req.body;
      const addToCart = await db.CartModel.updateOne({ _id: cart_id });
      if (addToCart) {
        return responseModel.successResponse("Item added to cart", addToCart);
      }
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };

  getCart = async (req, res) => {
    try {
      const { user_id } = req.body;
      if (user_id) {
        const getCart = await db.CartModel.find({ user_id: user_id });
        if (getCart) {
          return responseModel.successResponse(
            "Get cart successfully",
            getCart
          );
        }
      }
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };
}

module.exports = { CartController };
