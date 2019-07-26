const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;
const mongo = require("mongo");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// add some security-related headers to the response
app.use(helmet());
app.use(json());
app.use(cookieParser());

app.post(
  "*",
  (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      jwt.verify(token, process.env.JWT_SECRET, function(err, payload) {
        if (payload) {
          req.user = payload;
          next();
        } else {
          next();
        }
      });
    } catch (e) {
      next();
    }
  },
  async (req, res) => {
    const db = await mongo();
    const usersCollection = await db.collection("users");
    const users = await usersCollection.find().toArray();

    const questionsCollection = await db.collection("questions");
    const question = await questionsCollection.insert({
      title: req.body.title
    });

    const answersCollection = await db.collection("answers");
    const answer = await answersCollection.insert({
      user_id: req.user.user_id,
      question_id: question.ops[0]._id,
      title: question.ops[0].title,
      answer: req.body.item
    });

    res.send(answer.ops[0]);
  }
);

module.exports = app;
