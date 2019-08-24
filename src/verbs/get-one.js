export default function(collection, id, { db }) {
  return db
    .doc(`${collection}/${id}`)
    .get()
    .then(doc => doc.data())
    .catch(error => console.log(error));
}
