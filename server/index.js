const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 6000;

const router = require("./router");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// router to route request methods
app.use('/api', router);

app.listen(process.env.PORT || 3000, () =>
  console.log(`App listening on port ${port}!`)
);