const Transaction = require("../models/Transaction");
const { loginNibss, transferFunds } = require("../services/nibssService");

const makeTransfer = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    if (!from || !to || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. login to NIBSS to get token
    const nibssToken = await loginNibss();

    // 2. call NIBSS transfer endpoint
    const transferResponse = await transferFunds(nibssToken, from, to, amount);

    // 3. save transaction to MongoDB (IMPORTANT FOR HISTORY)
    const transaction = await Transaction.create({
      userId: req.user.id,   // 🔥 privacy enforcement
      from,
      to,
      amount,
      transactionId: transferResponse.transactionId,
      status: transferResponse.status
    });

    res.status(201).json({
      message: "Transfer completed",
      transaction
    });
  } catch (error) {
    res.status(500).json({
      message: "Transfer failed",
      error: error.response?.data || error.message
    });
  }
};

module.exports = { makeTransfer };
const getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      createdAt: -1
    });

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Could not fetch transactions" });
  }
};

module.exports = { makeTransfer, getMyTransactions };