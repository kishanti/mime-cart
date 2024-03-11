var express = require("express");
var router = express.Router();

const OrderController = require("../controllers/orders/orders.controller");

const orderCtrl = new OrderController.OrderController();

router.post("/create", async (req, res) => {
  let result = await orderCtrl.create(req);
  res.status(result.status).send(result);
});

router.get("/get", async (req, res) => {
  let result = await orderCtrl.get(req);
  res.status(result.status).send(result);
});
router.post("/get/vendor", async (req, res) => {
  let result = await orderCtrl.getBySellerId(req);
  res.status(result.status).send(result);
});

module.exports = router;
