const express = require("express");

const { create } = require("../controllers/roleController.js");

const checkRoles = require("../middlewaree/rolesMiddleware.js");
const checkAuth = require("../middlewaree/authMiddleware.js");
const validateBodyFields = require("../middlewaree/validateBodyFields.js");

const roleRouter = express.Router();

roleRouter.post(
  "/",
  checkAuth,
  checkRoles(["admin"]),
  validateBodyFields(["name"]),
  create
);

module.exports = roleRouter;
