const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressModel = Schema(
  {
    address: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    pin_code: {
      type: Number,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    lattitude: {
      type: String,
      default: null,
    },
    longitude: {
      type: String,
      default: null,
    },
    is_default: {
      type: String,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addresses", addressModel, "addresses");
