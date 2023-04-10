const express = require("express");
const router = express.Router();

const login = require("../controllers/login.js");
const dashboard = require("../controllers/dashboard.js");

const authMiddleware = require("../middleware/Auth_Mdw.js");

router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
