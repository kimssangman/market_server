const router = require("express").Router();
const authController = require("./auth_controller");

/* 회원가입  */
router.post("/signUp", authController.signUp);
/* 로그인  */
// router.post('/signIn', authController.signIn);

module.exports = router;
