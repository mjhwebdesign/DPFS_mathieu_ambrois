const express = require("express");
const router = express.Router();

router.get("/me", (req, res) => {
 if (!req.session || !req.session.user) {
  return res.status(401).json({ error: "No autenticado" });
 }

 res.json({
  id: req.session.user.id,
  email: req.session.user.email,
  role: req.session.user.role,
 });
});

module.exports = router;
