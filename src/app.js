/* eslint no-unused-vars: 0, camelcase: 0, no-await-in-loop: 0 */
import express from "express";
import cors from "cors";
import Firestore from "@google-cloud/firestore";
import _ from "./env";

export default function() {
  const app = express();

  const db = new Firestore({
    projectId: process.env.FIRESTORE_PROJECT_ID,
    credentials: {
      client_email: process.env.FIRESTORE_CLIENT_EMAIL,
      private_key: process.env.FIRESTORE_PRIVATE_KEY
    }
  });

  app.use(cors());

  app.get("/favico.ico", (req, res) => {
    res.sendStatus(404);
  });

  app.get("/", (req, res) => res.send("Lolwhut."));

  app.get("/baburnama", async (req, res) => {
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

  return app;
}
