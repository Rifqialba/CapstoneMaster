const jwt = require("jsonwebtoken");

const SECRET_KEY = "veywjhbewukj52678ijvdeujk"; // Ganti dengan kunci rahasia yang kuat

// Fungsi untuk menghasilkan JWT
exports.generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Fungsi untuk memverifikasi JWT
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
