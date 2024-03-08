const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productModel = Schema({
    vendor_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    category_id: [{
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    }],
    description: { type: String, },
    price: {
        type: Number,
        default: 0
    },
   
},{ timestamps: true });


module.exports = mongoose.model("products", productModel, "products");
 