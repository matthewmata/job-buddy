const db = require("./index");
const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  companyLocation: { type: String, required: true },
  url: { type: String, required: true },
  salary: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
});

const Jobs = mongoose.model("Jobs", jobsSchema);

module.exports = Jobs;
