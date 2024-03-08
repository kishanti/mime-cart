var express = require("express");
var router = express.Router();

const { ProductController } = require("../controllers/products/products.controller");
// const { joiValidate } = require("../helpers/validate");
// const { postValidate } = require("../validators/post.validate");
// const { checkAuthUser } = require("../middleware");

const productCtrl = new ProductController;

router.post("/create",
  // joiValidate(postValidate.create),
  async (req, res) => {
    let result = await productCtrl.create(req);
    res.status(result.status).send(result);
  });


module.exports = router;
