const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/party.routes.js")(app);
require("./app/routes/election.router.js")(app);
require("./app/routes/nomination.routes.js")(app);
require("./app/routes/voting.routes.js")(app);
//app.use("/users",usersRouter);
// set port, listen for requests
const PORT = process.env.PORT || 8060;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
