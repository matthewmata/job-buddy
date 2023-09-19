const axios = require('axios');
const cron = require("node-cron");
const dotenv = require("dotenv");
dotenv.config();

// schedules post each day at "00:00"
const everyDay = "0 0 * * *";

cron.schedule(everyDay, async () => {
  console.log("RUNNING!");
  console.log(
    `http://${process.env.ADDRESS}:${process.env.PORT}/api/job-buddy`
  );
  await axios.post(
    `http://${process.env.ADDRESS}:${process.env.PORT}/api/job-buddy`
  );
  try {
    console.log("successful post");
  } catch {
    console.error("did not post");
  }
});
