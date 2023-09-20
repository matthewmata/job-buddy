const express = require("express");
const cors = require("cors");

const app = express();
const port = 6000;

const router = require("./router");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router to route request methods
app.use("/api", router);

app.listen(port, () => console.log(`App listening on port ${port}!`));
