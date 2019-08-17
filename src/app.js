/* eslint no-unused-vars: 0, camelcase: 0, no-await-in-loop: 0 */
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Firestore from "@google-cloud/firestore";
import fortuneHTTP from "fortune-http";
import jsonApiSerializer from "fortune-json-api";
import _ from "./env";
import store from "./store";

export default function() {
  const app = express();

  const db = new Firestore({
    projectId: process.env.FIRESTORE_PROJECT_ID,
    credentials: {
      client_email: process.env.FIRESTORE_CLIENT_EMAIL,
      private_key: process.env.FIRESTORE_PRIVATE_KEY
    }
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  const fortuneListener = fortuneHTTP(store(), {
    serializers: [[jsonApiSerializer, { keys: ["id"], key: "id" }]]
  });

  app.get("/favico.ico", (req, res) => {
    res.sendStatus(404);
  });

  app.get("/", (req, res) => res.send("Wandertext API."));

  app.get("/baburnama-csv", async (req, res) => {
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
              return `"${field}"`;
            }

            return "";
          })
          .join(",") + "\r\n"
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

    res.json({ contributors, places, babur });
  });

  app.use((req, res) => {
    fortuneListener(req, res).catch(error => console.log(error));
  });

  return app;
}
