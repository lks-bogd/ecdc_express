const express = require("express");

const { create } = require("../controllers/roleController.js");

const checkRoles = require("../middlewaree/rolesMiddleware.js");
const checkAuth = require("../middlewaree/authMiddleware.js");

const roleRouter = express.Router();

roleRouter.post("/", checkAuth, checkRoles(["parent"]), create);

module.exports = roleRouter;
