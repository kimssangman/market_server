const router = require("express").Router();
const auth = require("./auth/auth_index");
const user = require("./user/user_index");
const product = require("./product/product_index");

router.use("/auth", auth);
router.use("/user", user);
router.use("/product", product);

module.exports = router;
