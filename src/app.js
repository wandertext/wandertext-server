/* eslint no-unused-vars: 0, camelcase: 0, no-await-in-loop: 0 */
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fortuneHTTP from "fortune-http";
import jsonApiSerializer from "fortune-json-api";
import store from "./store";
import firestore from "./firestore";
import apollo from "./graphql";

export default function() {
  const app = express();

  const db = firestore;

  apollo.applyMiddleware({
    app,
    path: "/graphql",
    bodyParserConfig: { limit: "50mb" }
  });

  const fortuneListener = fortuneHTTP(store(), {
    serializers: [[jsonApiSerializer, { keys: ["id"], key: "id" }]]
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.get("/favico.ico", (_, res) => {
    res.sendStatus(404);
  });

  app.get("/baburnama-csv", async (_, res) => {
    const entries = await db
      .collection("entries")
      .where("text", "==", "baburnama-1530")
      .get()
      .then(r => r.docs.map(d => d.data()));
    const places = {};
    const placeIds = [...new Set(entries.map(e => e.place))];
    for (const placeId of placeIds) {
      const place = await db
        .doc(`places/${placeId}`)
        .get()
        .then(r => r.data());
      places[placeId] = place;
    }

    const babur = await db
      .doc("texts/baburnama-1530")
      .get()
      .then(r => r.data());

    const header = [
      "id",
      "attestedName",
      "latitude",
      "longitude",
      ...babur.entryProperties.map(prop => prop.name)
    ];

    const csv = [header];
    for (const entry of entries) {
      const row = [
        entry.id,
        entry.attestedName,
        places[entry.place].latitude,
        places[entry.place].longitude
      ];
      babur.entryProperties.forEach(prop => {
        row.push(entry.properties[prop.name]);
      });
      csv.push(row);
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/csv");

    csv.forEach(row => {
      res.write(
        row
          .map(field => {
            if (field) {
              return `${field}`;
            }

            return "";
          })
          .join("\t") + "\r\n"
      );
    });

    res.end();
  });

  app.get("/baburnama-json", async (req, res) => {
    const entries = await db
      .collection("entries")
      .where("text", "==", "baburnama-1530")
      .get()
      .then(r => r.docs.map(d => d.data()));
    const places = [];
    const placeIds = [...new Set(entries.map(e => e.place))];
    for (const placeId of placeIds) {
      const place = await db
        .doc(`places/${placeId}`)
        .get()
        .then(r => r.data());
      places.push(place);
    }

    for (const entry of entries) {
      if (places[entry.place]) {
        entry.latitude = places[entry.place].latitude;
        entry.longitude = places[entry.place].longitude;
        entry.placeName = places[entry.place].placeName;
      }
    }

    const babur = await db
      .doc("texts/baburnama-1530")
      .get()
      .then(r => r.data());

    const contributors = [];
    for (const contributorId of babur.contributors) {
      const contributor = await db
        .doc(`contributors/${contributorId}`)
        .get()
        .then(r => r.data());
      contributors.push(contributor);
    }

    babur.entries = entries;

    // res.json({ contributors, places, babur });
    res.json(entries);
  });

  app.use((req, res) => {
    if (process.env.NODE_ENV === "development") {
      process.stdout.write(`${req.url}\n`);
    }

    fortuneListener(req, res).catch(error => console.log(error));
  });

  return app;
}
