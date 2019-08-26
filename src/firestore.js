/* eslint camelcase: 0 */
import Firestore from "@google-cloud/firestore";

require("dotenv").config();

let projectId = process.env.FIRESTORE_DEV_PROJECT_ID;
let client_email = process.env.FIRESTORE_DEV_CLIENT_EMAIL;
let private_key = process.env.FIRESTORE_DEV_PRIVATE_KEY;

if (process.env.NODE_ENV === "production") {
  projectId = process.env.FIRESTORE_PROJECT_ID;
  client_email = process.env.FIRESTORE_CLIENT_EMAIL;
  private_key = process.env.FIRESTORE_PRIVATE_KEY;
}

const firestore = new Firestore({
  projectId,
  credentials: {
    client_email,
    private_key
  }
});

export default firestore;
