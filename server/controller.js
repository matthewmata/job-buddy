const db = require("../database/models");
const webscraperAggregation = require("./utils/webscraper-aggregation");

module.exports = {
  // retrieve all posts
  retrieveAll: async (req, res) => {
    const jobData = await db.find({});
    try {
      res.status(200).send(jobData);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  // create more posts
  createMany: async (req, res) => {
    const newJobPostings = await webscraperAggregation();
    await db.insertMany(newJobPostings);
    try {
      res.status(201).send("Successfully Added Jobs");
    } catch (err) {
      res.status(400).send(err);
    }
  },
  // delete all posts
  deleteAll: async (req, res) => {
    await db.deleteMany({});
    try {
      res.status(200).send("Deleted All");
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
