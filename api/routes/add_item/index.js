const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;
const mongo = require("mongo");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const sanitizeHtml = require("sanitize-html");
const linkifyUrls = require("linkify-urls");
const got = require("got");
const urlRegex = require("url-regex");
const appendQuery = require("append-query");
const ObjectID = require("mongodb").ObjectID;

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

    const answer = await db.collection("answers").findOne({
      _id: new ObjectID(req.body.answer_id)
    });

    let item = req.body.item;

    let answerContent = item;
    let meta = null;

    if (!!item.match(urlRegex())) {
      const firstUrl = item.match(urlRegex())[0];

      const { body: data } = await got(
        `${process.env.API_URL}/meta?url=${firstUrl}`,
        {
          json: true,
          headers: {
            "User-Agent": req.headers["user-agent"]
          }
        }
      );

      meta = data;

      // TODO: automatically add Amazon Affiliate ID
      if (meta.publisher === "Amazon") {
        meta.url = appendQuery(meta.url, { tag: "profiledotim-20" });
      }

      removeCardUrl = item.replace(firstUrl, "");
      answerContent = linkifyUrls(removeCardUrl);
    }

    sanitizedAnswerContent = sanitizeHtml(answerContent, {
      allowedTags: ["a"],
      allowedAttributes: {
        a: ["href"]
      }
    });

    const updatedAnswer = await db.collection("answers").updateOne(
      { _id: new ObjectID(req.body.answer_id) },
      {
        $push: {
          items: {
            content: sanitizedAnswerContent,
            meta
          }
        }
      }
    );

    res.send(updatedAnswer);
  }
);

module.exports = app;
