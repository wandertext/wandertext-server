import _ from "./env";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fortuneHTTP from "fortune-http";
import jsonApiSerializer from "fortune-json-api";
// import apollo from "./graphql";
import store from "./store";

const port = process.env.PORT || 4040

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// apollo.applyMiddleware({ app });

const fortuneListener = fortuneHTTP(store, {
  serializers: [[jsonApiSerializer]]
});

app.use((req, res) =>
  fortuneListener(req, res).catch(error => console.log(error))
);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
