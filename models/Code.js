const mongoose = require("mongoose");

const CodesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    publicFigure: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "PublicFigure",
    },
    code: String,
  },
  {
    timestamps: true,
  }
);

const Codes = mongoose.model("Codes", CodesSchema);

module.exports = Codes;
