const bcrypt = require("bcrypt");
const db = require("../db/db");
const { generateToken } = require("../utils/jwtUtils");

const ADMIN_SECRET_KEY = "jadiadminprokprokprok";

// Register
exports.register = async (req, res) => {
  const { username, password, role, secretKey } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Username, password, and role are required" });
  }

  if (role === "admin" && secretKey !== ADMIN_SECRET_KEY) {
    return res.status(403).json({ message: "Invalid secret key for admin role" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    db.query(sql, [username, hashedPassword, role], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const payload = {
        id: result.insertId,
        username,
        role,
      };

      const token = generateToken(payload);

      res.status(201).json({
        message: "User registered successfully",
        token,
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const sql = "SELECT * FROM users WHERE username = ?";
    const [rows] = await db.promise().query(sql, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = generateToken(payload);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
