const { jwtDecode } = require("jwt-decode");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  // ✅ Check if token is a valid JWT format (3 dot-separated parts)
  if (!token || token.split(".").length !== 3) {
    return res.status(401).json({ message: "Malformed token" });
  }

  try {
    const decoded = jwtDecode(token);
    req.user = decoded;
    console.log("✅ Decoded user:", decoded); // Optional: Debug
    next();
  } catch (err) {
    console.error("❌ Token decode error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
