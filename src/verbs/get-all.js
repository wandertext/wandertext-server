export default function(collection, { db }) {
  return db
    .collection(collection)
    .get()
    .then(ref => ref.docs.map(doc => doc.data()))
    .catch(error => console.log(error));
}
