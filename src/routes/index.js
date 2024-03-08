const express = require("express");
const router = express.Router();

// router.use("/", require("./auth.routes"));
router.use("/product", require("./product.routes"));
router.use("/category", require("./categories.routes"));
router.use("/auth", require("./auth.routes"));


module.exports = router;
