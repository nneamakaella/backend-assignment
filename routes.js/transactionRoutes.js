const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  makeTransfer,
  getMyTransactions
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/transfer", protect, makeTransfer);
router.get("/transactions", protect, getMyTransactions);

module.exports = router;