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
  const user = await usersCollection.findOne({ username: req.query.username });

  if (!user) {
    return res.status("404").send("User not found");
  }

  usersCollection.update(
    { _id: user._id },
    {
      $inc: { profile_views: 1 },
      $set: { _id: user._id }
    },
    { upsert: true }
  );

  const answersCollection = await db.collection("answers");

  const answers = await answersCollection
    .find({ user_id: user._id.toString() })
    .toArray();

  res.send({ user, answers });
});

module.exports = app;
