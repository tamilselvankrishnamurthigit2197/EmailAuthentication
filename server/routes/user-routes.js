const express = require("express");

const userRouter = express.Router();

const {registerUser, loginUser, logOut} = require("../controllers/user-controller");

const {userAuthVerification} = require("../middleWare/auth-middleWare");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/auth", userAuthVerification);
userRouter.post("/logout", logOut);

module.exports = userRouter;