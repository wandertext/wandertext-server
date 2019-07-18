/* eslint no-unused-vars: 0 */
import express from "express";
import cors from "cors";
import _ from "./env";

export default function() {
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
