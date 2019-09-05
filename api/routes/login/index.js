const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const helmet = require("helmet");
const app = express();
const mongo = require("mongo");
const jwt = require("jsonwebtoken");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.API_URL}/login`,
      profileFields: ["id", "displayName", "picture", "email"]
    },
    async (accessToken, refreshToken, { _json: profile }, cb) => {
      const db = await mongo();
      const usersCollection = await db.collection("users");

      const { value: user } = await usersCollection.findOneAndUpdate(
        { facebook_id: profile.id },
        {
          $set: {
            facebook_id: profile.id,
            name: profile.name,
            picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase()
          }
        },
        {
          returnNewDocument: true,
          upsert: false
        }
      );

      return cb(null, user);
    }
  )
);

// add some security-related headers to the response
app.use(helmet());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(passport.initialize());

app.get(
  "*",
  passport.authenticate("facebook", {
    session: false
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET);

    res.cookie("jwt", token);
    res.send({ user, token });
  }
);

module.exports = app;
