const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIRESTORE_PROJECT_ID,
  "private_key_id": process.env.FIRESTORE_PRIVATE_KEY_ID,
  "private_key": process.env.FIRESTORE_PRIVATE_KEY,
  "client_email": process.env.FIRESTORE_CLIENT_EMAIL,
  "client_id": process.env.FIRESTORE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FIRESTORE_CLIENT_X509_CERT_URL
};

exports.connectToFirestore = function() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  return admin.firestore();
}
