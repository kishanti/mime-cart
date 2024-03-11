const express = require("express");
const router = express.Router();

router.use("/product", require("./product.routes"));
router.use("/category", require("./categories.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/common", require("./common.routes"));
router.use("/cart", require("./carts.routes"));
router.use("/order", require("./orders.routes"));

module.exports = router;
