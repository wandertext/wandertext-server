/* eslint no-unused-vars: 0 */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fortuneHTTP = require("fortune-http");
const jsonApiSerializer = require("fortune-json-api");
const _ = require("./env");
const { store } = require("./store");

exports.expressApp = function() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  const fortuneListener = fortuneHTTP(store(), {
    serializers: [[jsonApiSerializer]]
  });

  app.use((req, res) =>
    fortuneListener(req, res).catch(error => console.log(error))
  );

  return app;
};
