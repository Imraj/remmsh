const mongoose = require("mongoose");

const publicFigureSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nameAr: {
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
