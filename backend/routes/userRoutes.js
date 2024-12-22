const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.get("/users", authenticate, authorize(["admin"]), userController.getAllUsers);

router.delete("/users/:id", authenticate, authorize(["admin"]), userController.deleteUser);

module.exports = router;
