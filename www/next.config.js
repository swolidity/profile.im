const prod = process.env.NODE_ENV === "production";

module.exports = {
  target: "serverless",
  env: {
    API_URL: prod ? "https://profile.im/api" : "http://localhost:3000/api"
  }
};
