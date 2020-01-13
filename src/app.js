/* eslint no-unused-vars: 0, camelcase: 0, no-await-in-loop: 0 */
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Contributor, Place, Text, Flag, Entry } from "./models";

export default function() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.get("/favico.ico", (_, res) => {
    res.sendStatus(404);
  });

  app.get("/sql/entries", (_, res) =>
    Entry.findAll().then(entries => res.json(entries))
  );

  app.get("/sql/contributors", (_, res) =>
    Contributor.findAll().then(contributors => res.json(contributors))
  );

  app.get("/sql/places", (_, res) =>
    Place.findAll().then(places => res.json(places))
  );


  app.get("/sql/flags", (_, res) =>
    Flag.findAll().then(flags => res.json(flags))
  );

  app.get("/sql/texts", (_, res) =>
    Text.findAll().then(texts => res.json(texts))
  );

  return app;
}
