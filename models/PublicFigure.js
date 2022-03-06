const mongoose = require("mongoose");

const publicFigureSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activeTimer: { type: Number },
    discount: {
      type: Number,
    },
    discountExpireAt: Date,
    totalSeen: {
      type: Number,
    },
    totalEngagement: {
      type: Number,
    },
    totalActivation: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const PublicFigure = mongoose.model("PublicFigure", publicFigureSchema);

module.exports = PublicFigure;
