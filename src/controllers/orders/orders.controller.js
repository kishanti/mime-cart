const mongoose = require("mongoose");
const { db } = require("../../models");
const { responseModel } = require("../../responses");
var ObjectId = mongoose.Types.ObjectId;

class OrderController {
  constructor() {}
  create = async (req, res) => {
    try {
      const {
        user_id,
        vendor_id,
        cart_id,
        net_amount,
        order_status,
        address_id,
      } = req.body;

      const orderDetails = {
        user_id: user_id,
        vendor_id: vendor_id,
        cart_id: cart_id,
        net_amount: net_amount,
        address_id: address_id,
      };
      const createOrder = await db.OrderModel.create(orderDetails);
      return responseModel.successResponse(
        "Order placed successfully",
        createOrder
      );
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };

  get = async (req, res) => {
    try {
      const getOrders = await db.OrderModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "vendor_id",
            foreignField: "_id",
            as: "vendor",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "addresses",
            localField: "address_id",
            foreignField: "_id",
            as: "addresses",
          },
        },
        { $unwind: "$user" },
        { $unwind: "$addresses" },
        { $unwind: "$vendor" },
        {
          $project: {
            _id: 1,
            payment_id: 1,
            status: 1,
            cart_id: 1,
            net_amount: 1,
            createdAt: 1,
            updatedAt: 1,
            vendor_name: "$vendor.first_name", // Include vendor name
            buyer_name: "$user.first_name", // Include user name
            addresses: "$addresses.address", // Include the entire addresses document
          },
        },
      ]);
      return responseModel.successResponse(
        1,
        "Order get successfully",
        getOrders
      );
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };
  getBySellerId = async (req, res) => {
    try {
      const { vendor_id } = req.body;
      const getOrders = await db.OrderModel.find({ vendor_id: vendor_id });
      return responseModel.successResponse("Order get successfully", getOrders);
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.");
    }
  };
}

module.exports = { OrderController };
