const express = require("express");
const helmet = require("helmet");
const app = express();
const json = require("body-parser").json;
const mongo = require("mongo");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
import fetch from "isomorphic-unfetch";

let token = null;

const search = ({ query, type = "track,artist" }) => {
  return fetch(
    encodeURI(`https://api.spotify.com/v1/search?q=${query}&type=${type}`),
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(res => {
      if (res.ok) return res;

      // check if token expired, need new one
      //
      if (res.status === 401) {
        token = null;
      }

      Promise.reject(res);
    })
    .then(res => res.json());
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
    if (token === null) {
      const newTokenRes = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${process.env.SPOTIFY_CLIENT_BASE_64}`
          },
          body: new URLSearchParams({
            grant_type: "client_credentials"
          })
        }
      );

      const newTokenJSON = await newTokenRes.json();

      token = newTokenJSON.access_token;

      console.log("TOKEN", newTokenJSON);
    }

    console.log("saved token", token);

    const results = await search({ query: req.query.search });

    res.send(results);
  }
);

module.exports = app;
