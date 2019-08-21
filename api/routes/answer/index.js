const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;
const mongo = require("mongo");
const ObjectID = require("mongodb").ObjectID;

// add some security-related headers to the response
app.use(helmet());
app.use(json());

app.get("*", async (req, res) => {
  const db = await mongo();
  const answer = await db
    .collection("answers")
    .findOne({ _id: new ObjectID(req.query.id) });

  if (!answer) {
    return res.status("404").send("Answer not found");
  }

  res.send({ answer });
});

module.exports = app;
