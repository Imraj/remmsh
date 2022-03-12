const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
	img: {
		type: [Buffer]
	}
  },
  {
    timestamps: true,
  }
);

const Images = mongoose.model("Images", ImageSchema);

module.exports = Images;
