const express = require("express");
const router = express.Router();
const { createCustomer, getCustomers } = require("../controllers/customerController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware); // ✅ This must come before all routes

router.post("/", createCustomer);
router.get("/", getCustomers);

module.exports = router;
