const fs = require("fs");
const firebase = require("@firebase/testing");

module.exports.setup = async (auth, data) => {
  const projectId = `rules-spec-${Date.now()}`;
  const app = await firebase.initializeTestApp({
    projectId,
    auth
  });

  const db = app.firestore();

  // Mock documents before rules
  if (data) {
    for (const key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        const ref = db.doc(key);
        await ref.set(data[key]);
      }
    }
  }

  // Apply rules
  await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync("firestore.rules", "utf8")
  });

  return db;
};

module.exports.teardown = async () => {
  Promise.all(firebase.apps().map(app => app.delete()));
};
