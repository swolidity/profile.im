const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;
const mongo = require("mongo");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const ObjectID = require("mongodb").ObjectID;

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
    const usersCollection = await db.collection("users");
    const user = await usersCollection.findOne({
      _id: new ObjectID(req.user.user_id)
    });

    res.send(user);
  }
);

module.exports = app;
