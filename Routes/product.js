const express = require("express");

const router = express.Router();

// Controllers
const {
  create,
  listAll,
  list,
  productsCount,
  read,
  remove,
  update,
} = require("../Controllers/products");

// Routes
router.get("/products/total", productsCount);
router.post("/product", create);
router.get("/products/:count", listAll);
router.get("/productget/:slug", read);
router.post("/products", list);
router.put("/products/:slug", update);

router.delete("/product/:slug", remove);

module.exports = router;
