const router = require("express").Router();
const productController = require("./product_controller");

/* 회원가입  */
router.get("/getProduct", productController.getProduct);
/* 로그인  */
// router.post('/signIn', authController.signIn);

module.exports = router;
