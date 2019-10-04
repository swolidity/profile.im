const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;
const mongo = require("mongo");
const ObjectID = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// add some security-related headers to the response
app.use(helmet());
app.use(json());
app.use(cookieParser());

app.get(
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

    let loggedInUserAnswer;

    if (req.user) {
      loggedInUserAnswer = await db
        .collection("answers")
        .findOne({
          question_id: new ObjectID(question._id),
          user_id: req.user._id
        });
    }

    res.send({ question, loggedInUserAnswer });
  }
);

module.exports = app;
