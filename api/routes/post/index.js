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
  const post = await db.collection("posts").findOne({ slug: req.query.slug });

  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectID(post.user_id) });

  post.items = [];

  if (post.type === "list") {
    const items = await db
      .collection("items")
      .find({ post_id: post._id })
      .toArray();

    post.items = items;
  }

  res.send({ user, post });
});

module.exports = app;
