/* eslint camelcase: 0 */
import Firestore from "@google-cloud/firestore";

require("dotenv").config();

const firestore = new Firestore({
  projectId: process.env.FIRESTORE_PROJECT_ID,
  credentials: {
    client_email: process.env.FIRESTORE_CLIENT_EMAIL,
    private_key: process.env.FIRESTORE_PRIVATE_KEY
  }
});

export default firestore;
