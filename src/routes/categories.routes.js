var express = require("express");
var router = express.Router();

const CategoryController = require("../controllers/categories/categories.controller");

const categoryCtrl = new CategoryController.CategoryController();

router.post("/create",
  async (req, res) => {
    console.log("create category")
    let result = await categoryCtrl.create(req);
    res.status(result.status).send(result);
  });


module.exports = router;
