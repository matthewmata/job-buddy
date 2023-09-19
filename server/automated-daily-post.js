const axios = require('axios');
const cron = require("node-cron");
const dotenv = require("dotenv");
dotenv.config({path: '../.env'});

// schedules post each day at "00:00"
const everyDay = "0 0 * * *";
const everyMin = "*/1 * * * *";

cron.schedule(everyMin, async () => {
  console.log("RUNNING!");
  console.log(`${process.env.ADDRESS}/api/job-buddy`);
  await axios.post(`${process.env.ADDRESS}/api/job-buddy`);
  try {
    console.log("successful post");
  } catch {
    console.error("did not post");
  }
});
