var express = require("express");
var router = express.Router();

const CartController = require("../controllers/carts/carts.controller");

const cartCtrl = new CartController.CartController();

router.post("/add-to-cart", async (req, res) => {
  let result = await cartCtrl.addToCart(req);
  res.status(result.status).send(result);
});

router.post("/get", async (req, res) => {
  let result = await cartCtrl.getCart(req);
  res.status(result.status).send(result);
});

router.delete("/delete/:id", async (req, res) => {
  let result = await cartCtrl.updateCart(req);
  res.status(result.status).send(result);
});

module.exports = router;
