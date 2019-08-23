import firestore from "../firestore";

export default function(collection, id) {
  return firestore
    .doc(`${collection}/${id}`)
    .get()
    .then(doc => doc.data())
    .catch(error => console.log(error));
}
