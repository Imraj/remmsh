const mongoose = require("mongoose");

const CodesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    code: String,
  },
  {
    timestamps: true,
  }
);

const Codes = mongoose.model("Codes", CodesSchema);

module.exports = Codes;
