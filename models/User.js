const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    credits: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Credit",
    },
    publicFigures: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "PublicFigure",
    },
    name: {
      type: String,
      required: true,
    },
    nameAr: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: false,
    },
    districtAr: {
      type: String,
      required: false,
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
    type: {
      type: String,
    },
    totalSeen: {
      type: Number,
    },
    totalEngagement: {
      type: Number,
    },
    totalActivation: {
      type: Number,
    },
    ShowSocialMediaLinkes: {
      type: Boolean,
      default: false,
    },
    instagram: {
      type: String,
    },
    snapchat: {
      type: String,
    },
    twitter: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
