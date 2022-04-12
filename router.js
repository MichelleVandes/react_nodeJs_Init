const express = require("express");
const router = express.Router();
const controller = require('./controllers')



router.post("/signup", controller.signup);
router.post("/login", controller.login);

//router.post("/user", controller.createUser);
router.get("/user/:email", controller.oneUser);

module.exports = router;
