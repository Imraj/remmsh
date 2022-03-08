const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const User = require("../models/User");

var storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-remmsh-${file.originalname}`;
      console.log("filename:::filename::storage", filename)
      return filename;
    }
    console.log("filename:::filename::storage", filename)
    return {
      bucketName: process.env.BUCKET,
      filename: `${Date.now()}-remmsh-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;