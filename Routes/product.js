const express = require("express");

const router = express.Router();

// Controllers
const {
  create,
  createPro,
  listAll,
  listAllMobile,
  listAllLaptop,
  listAllTv,
  list,
  productsCount,
  read,
  remove,
  update,
} = require("../Controllers/products");

// Routes
router.get("/products/total", productsCount);
router.post("/product", create);
router.post("/productDef", createPro);

router.get("/products/:count", listAll);
router.get("/productsmobile/:count", listAllMobile);
router.get("/productslaptop/:count", listAllLaptop);
router.get("/productstv/:count", listAllTv);

router.get("/productget/:slug", read);
router.post("/products", list);

router.put("/products/:slug", update);
// router.put("/products/:slug", update);

router.delete("/product/:slug", remove);

module.exports = router;
