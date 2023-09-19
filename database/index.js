const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const clusterName = process.env.CLUSTERNAME;
const databaseName = process.env.DATABASENAME;
const url = `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${databaseName}?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection failed: "));
db.once("open", () => {
  console.log("Connected successfully");
});
