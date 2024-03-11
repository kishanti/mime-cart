var express = require("express");
var router = express.Router();
const upload = require("../services/multer.service");
const { checkBearerToken, verifyVendor } = require("../middleware");
const {
  ProductController,
} = require("../controllers/products/products.controller");

const productCtrl = new ProductController();

router.post(
  "/create",
  checkBearerToken,
  verifyVendor,
  upload.fields([{ name: "product_image", maxCount: 1 }]),
  async (req, res) => {
    let result = await productCtrl.create(req);
    res.status(result.status).send(result);
  }
);

router.get(
  "/get",
  checkBearerToken,
  async (req, res) => {
    let result = await productCtrl.get(req);
    res.status(result.status).send(result);
  }
);

router.get(
  "/get/:id",
  checkBearerToken,
  async (req, res) => {
    let result = await productCtrl.getById(req);
    res.status(result.status).send(result);
  }
);

router.delete(
  "/delete/:id",
  checkBearerToken,
  verifyVendor,
  async (req, res) => {
    let result = await productCtrl.delete(req);
    res.status(result.status).send(result);
  }
);

router.patch(
  "/update/:id",
  checkBearerToken,
  verifyVendor,
  upload.fields([{ name: "product_image", maxCount: 1 }]),
  async (req, res) => {
    let result = await productCtrl.update(req);
    res.status(result.status).send(result);
  }
);

module.exports = router;
