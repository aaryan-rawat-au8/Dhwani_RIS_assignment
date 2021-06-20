const mongoose = require("mongoose");
const subState = mongoose.Schema({
  state: {
    type: String,
  },
});

const dis = mongoose.Schema({
  district: String,
});

const child = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  mother_name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
});
const userData = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  state: [subState],
  dis: [dis],
  child: [child],
});

module.exports = new mongoose.model("data", userData);
