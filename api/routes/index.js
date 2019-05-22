const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;

// add some security-related headers to the response
app.use(helmet());
app.use(json());

app.get("*", async (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(200, "profile.im api ");
});

module.exports = app;
