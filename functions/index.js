const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.updateEntry = functions.firestore
  .document("entries/{entryId}")
  .onUpdate(change => {
    const { ref } = change.after;
    const newValue = change.after.data();
    const previousValue = change.before.data();
    const now = admin.firestore.Timestamp.now();
    newValue.modifiedOn = now;
    previousValue.replacedOn = now;
    return ref
      .collection("revisions")
      .doc()
      .set(previousValue);
  });
