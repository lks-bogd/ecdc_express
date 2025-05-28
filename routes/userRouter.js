const express = require("express");
const {
  login,
  register,
  refreshTokens,
  logout,
} = require("../controllers/userController");

const checkAuth = require("../middlewaree/authMiddleware.js");

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/refresh", checkAuth, refreshTokens);
userRouter.get("/logout", checkAuth, logout);

module.exports = userRouter;
