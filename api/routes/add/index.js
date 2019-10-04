const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;
const mongo = require("mongo");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const sanitizeHtml = require("sanitize-html");
const got = require("got");
const urlRegex = require("url-regex");
const appendQuery = require("append-query");
const slugify = require("@sindresorhus/slugify");
const { extract } = require("oembed-parser");

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
    const question = await questionsCollection.insertOne({
      title: req.body.title,
      slug: slugify(req.body.title),
      user_id: req.user.user_id,
      created_at: new Date()
    });

    let item = req.body.item;

    let answerContent = item;
    let meta = null;
    let oembed = null;

    if (!!item.match(urlRegex())) {
      const firstUrl = item.match(urlRegex())[0];

      try {
        oembed = await extract(firstUrl);

        if (oembed) {
          oembed.url = firstUrl;
        }
      } catch (e) {
        console.log(e);
      }

      if (!oembed) {
        try {
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

          if (meta.publisher === "Amazon") {
            meta.url = appendQuery(meta.url, { tag: "profiledotim-20" });
          }
        } catch (e) {
          console.log(e.message);
        }
      }
    }

    sanitizedAnswerContent = sanitizeHtml(answerContent, {
      allowedTags: ["a"],
      allowedAttributes: {
        a: ["href"]
      }
    });

    const answersCollection = await db.collection("answers");
    const answer = await answersCollection.insertOne({
      user_id: req.user.user_id,
      question_id: question.ops[0]._id,
      title: question.ops[0].title,
      content: sanitizedAnswerContent,
      meta,
      oembed,
      created_at: new Date()
    });

    res.send(answer.ops[0]);
  }
);

module.exports = app;
