const jwt = require("jsonwebtoken");

// AUTH MIDDLEWARE (FIXED)
const authMiddleware = (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // If header is "Bearer <token>"
    let token = authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : authHeader; // If token is sent alone

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ROLE CHECKING
const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { authMiddleware, requireRole };
