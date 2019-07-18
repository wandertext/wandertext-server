/* eslint no-unused-vars: 0 */
const express = require("express");
const cors = require("cors");
const _ = require("./env");

exports.expressApp = function() {
  const app = express();

  app.use(cors());

  app.get("/favico.ico", (req, res) => {
    res.sendStatus(404);
  });

  app.get("/baburnama", (req, res) => {
    res.json({ user: "tobi" });
  });

  return app;
};
