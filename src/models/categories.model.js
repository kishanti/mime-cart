const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryModel = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", categoryModel, "categories");
