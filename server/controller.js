const db = require("../database/models");

module.exports = {
  retrieveAll: async (req, res) => {
    const jobData = await db.find({})
    try {
      res.status(200).send(jobData);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createMany: async (req, res) => {
    const TESTDATA = [
      {
        title: "Full-Stack Developer",
        companyName: "FULLTIMEFORCE",
        companyLocation: "Remote",
        url: "https://www.indeed.com/rc/clk?jk=64129d9bd0a9e055&fccid=211f351788d78572&vjs=3",
        salary: "n/a",
        description:
          "Likewise, we seek to promote a pleasant work environment with horizontal and transparent internal communication at all times.",
        date: "Mon Sep 18 2023 16:16:50 GMT-0700 (Pacific Daylight Time)",
      },
    ];
    await db.insertMany(TESTDATA);
    try {
      res.status(201).send('Successfully Added Jobs');
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteAll: async (req, res) => {
    await db.deleteMany({});
    try {
      res.status(200).send("Deleted All")
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
