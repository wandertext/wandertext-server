import firestore from "../firestore";

export default function(collection) {
  return firestore
    .collection(collection)
    .get()
    .then(ref => ref.docs.map(doc => doc.data()))
    .catch(error => console.log(error));
}
