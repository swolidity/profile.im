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
  const question = await db
    .collection("questions")
    .findOne({ _id: new ObjectID(req.query.id) });

  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectID(question.user_id) });

  question.user = user;

  if (!question) {
    return res.status("404").send("Question not found");
  }

  res.send({ question });
});

module.exports = app;
