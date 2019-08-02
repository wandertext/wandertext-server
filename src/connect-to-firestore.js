/* eslint camelcase: 0 */
const Firestore = require("@google-cloud/firestore");
require("dotenv").config();

module.exports = function() {
  return new Firestore({
    projectId: process.env.FIRESTORE_PROJECT_ID,
    credentials: {
      private_key: process.env.FIRESTORE_PRIVATE_KEY,
      client_email: process.env.FIRESTORE_CLIENT_EMAIL
    }
  });
};
