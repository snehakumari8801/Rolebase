const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model("Data", dataSchema);