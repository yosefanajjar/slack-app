const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { WebClient } = require("@slack/web-api");

const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(indexRouter);

const web = new WebClient(
  process.env.WORKSPACE_TOKEN // each workspace has one of these and its needed to send messages without firing commands like notifications
);

const currentTime = new Date().toTimeString();

(async () => {
  try {
    await web.chat.postMessage({
      channel: "#general",
      text: `The current time is ${currentTime}`,
    });
  } catch (error) {
    console.log(error);
  }
  console.log("Message posted!");
})();

module.exports = app;
