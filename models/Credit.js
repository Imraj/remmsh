const mongoose = require("mongoose");

const CreditSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    balance: {
      type: Number,
      required: true,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

const Credit = mongoose.model("Credit", CreditSchema);

module.exports = Credit;
