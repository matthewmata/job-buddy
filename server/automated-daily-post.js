const axios = require('axios');
const cron = require("node-cron");
const dotenv = require("dotenv");
dotenv.config({path: '../.env'});

cron.schedule("0 0 * * *", async () => {
  console.log("RUNNING!");
  console.log(`${process.env.ADDRESS}/api/job-buddy`);
  await axios.post(`${process.env.ADDRESS}/api/job-buddy`);
  try {
    console.log("successful post");
  } catch {
    console.error("did not post");
  }
});
