const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderModel = Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    vendor_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    cart_id: {
      type: Schema.Types.ObjectId,
      ref: "carts",
      required: true,
    },
    net_amount: { type: Number },
    order_status: { type: String },
    address_id: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    payment_id: { type: String, default: null },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderModel, "orders");
