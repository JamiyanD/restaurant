const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({
      success: false,
      messege: "Хэрэглэгчийн token оруулах шаардлагатай.",
    });
  }
  try {
    const decoded = jwt.verify(token, "MyPrivateKey");
    req.user = decoded;
  } catch (err) {
    res.status(401).json({
      success: false,
      messege: "Хэрэглэгчийн token буруу, эсвэл идэвхигүй байна.",
    });
  }
  return next();
};

module.exports = verifyToken;
