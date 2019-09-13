const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;
const mongo = require("mongo");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const search = require("youtube-search");

const opts = {
  maxResults: 10,
  key: process.env.YOUTUBE_API_KEY
};

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
    const results = await search(req.query.search, opts);

    res.send(results);
  }
);

module.exports = app;
