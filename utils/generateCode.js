const Code = require("../models/Code");
const promisify = require("util").promisify;

const getNumber = (callback) => {
  const code = Math.floor(Math.random() * 1000000);
  Code.findOne({ code }, (err, result) => {
    if (err) callback(err);
    else if (result) return getNumber(callback);
    else callback(null, code);
  });
};

const getCode = promisify(getNumber);

module.exports = {
  getCode,
};
