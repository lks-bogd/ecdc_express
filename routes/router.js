const express = require("express");
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter");

const router = express.Router();

router.use("/auth", userRouter);
router.use("/role", roleRouter);

module.exports = router;
