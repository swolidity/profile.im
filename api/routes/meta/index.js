const express = require("express");
const helmet = require("helmet");
const app = express();
const got = require("got");
const metascraper = require("metascraper")([
  require("metascraper-author")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-logo")(),
  require("metascraper-clearbit-logo")(),
  require("metascraper-logo-favicon")(),
  require("metascraper-publisher")(),
  require("metascraper-title")(),
  require("metascraper-url")(),
  require("metascraper-logo-favicon")(),
  require("metascraper-amazon")(),
  require("metascraper-youtube")(),
  require("metascraper-soundcloud")(),
  require("metascraper-video-provider")()
]);

// add some security-related headers to the response
app.use(helmet());

app.get("*", async (req, res) => {
  const url = encodeURI(req.query.url);

  if (!url)
    return res
      .status(401)
      .send("Please supply a URL to be scraped in the url query parameter.");

  let statusCode, data;

  try {
    const { body: html } = await got(url, {
      headers: {
        "User-Agent": req.headers["user-agent"]
      }
    });
    data = await metascraper({ url, html });
    statusCode = 200;
  } catch (err) {
    console.log(err);
    statusCode = 401;
    data = {
      message: `Scraping the open graph data from "${url}" failed.`,
      suggestion:
        "Make sure your URL is correct and the webpage has open graph data, meta tags or twitter card data."
    };
  }

  res.status(statusCode).send(data);
});

module.exports = app;
