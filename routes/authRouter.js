const express = require("express");
const {
  login,
  register,
  refreshTokens,
  logout,
} = require("../controllers/authController.js");

const checkAuth = require("../middlewaree/authMiddleware.js");
const validateBodyFields = require("../middlewaree/validateBodyFields.js");

const authRouter = express.Router();

authRouter.post("/login", validateBodyFields(["email", "password"]), login);
authRouter.post("/register", register);
authRouter.post("/refresh", checkAuth, refreshTokens);
authRouter.get("/logout", checkAuth, logout);

module.exports = authRouter;
