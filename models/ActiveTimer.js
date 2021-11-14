const mongoose = require("mongoose");

const ActiveTimerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    countdownTimestamp: Number,
  },
  {
    timestamps: true,
  }
);

const ActiveTimer = mongoose.model("ActiveTimer", ActiveTimerSchema);

module.exports = ActiveTimer;
