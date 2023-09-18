const express = require("express");
const app = express();
const port = 6000;
const router = require("./router");

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Router to route request methods
app.use('/api', router);

app.listen(port, () => console.log(`App listening on port ${port}!`))