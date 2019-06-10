const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;
const mongo = require("mongo");

// add some security-related headers to the response
app.use(helmet());
app.use(json());

app.get("*", async (req, res) => {
  const db = await mongo();
  const usersCollection = await db.collection("users");
  const users = await usersCollection.find().toArray();

  res.send(users);
});

module.exports = app;
