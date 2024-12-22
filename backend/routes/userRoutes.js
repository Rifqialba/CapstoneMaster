const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

// Mendapatkan semua pengguna
router.get("/users", authenticate, authorize(["admin"]), userController.getAllUsers);

// Menghapus pengguna berdasarkan ID
router.delete("/users/:id", authenticate, authorize(["admin"]), userController.deleteUser);

module.exports = router;
