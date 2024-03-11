const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartModel = Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: { type: Number },
    net_amount: { type: Number },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("carts", cartModel, "carts");
