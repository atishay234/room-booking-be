const jwt = require("jsonwebtoken");

const generateTemporaryToken = (userId) => {
  const token = jwt.sign({ userId }, "your-secret-key");
  return token;
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = { generateTemporaryToken, authMiddleware };
