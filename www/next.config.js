const prod = process.env.NODE_ENV === "production";

module.exports = {
  target: "serverless",
  env: {
    ROOT_URL: prod ? "https://profile.im" : "http://localhost:3000",
    API_URL: prod ? "https://profile.im/api" : "http://localhost:3000/api",
    FACEBOOK_APP_ID: prod ? "2815966931762706" : "602562463567070"
  }
};
