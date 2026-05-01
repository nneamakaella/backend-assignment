const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    from: { type: String, required: true },
    to: { type: String, required: true },

    amount: { type: Number, required: true },

    transactionId: { type: String, required: true }, // TSQ ID from NIBSS
    status: { type: String, default: "PENDING" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);