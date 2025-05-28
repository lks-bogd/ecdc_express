const express = require("express");
const checkAuth = require("../middlewaree/authMiddleware.js");
const checkRoles = require("../middlewaree/rolesMiddleware.js");
const validateBodyFields = require("../middlewaree/validateBodyFields.js");
const { create, update } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post(
  "/",
  checkAuth,
  checkRoles(["admin"]),
  validateBodyFields([
    "firstName",
    "lastName",
    "middleName",
    "dateOfBirth",
    "phone",
    "email",
    "role",
  ]),
  create
);
userRouter.put(
  "/profile",
  checkAuth,
  validateBodyFields([
    "firstName",
    "lastName",
    "middleName",
    "dateOfBirth",
    "phone",
  ]),
  update
);

module.exports = userRouter;
