const router = require("express").Router();
const productController = require("./product_controller");

/* 상품 목록 불러오기  */
router.get("/getProduct", productController.getProduct);

/* 상품 상세 불러오기  */
router.get("/getProductDetail", productController.getProductDetail);

module.exports = router;
