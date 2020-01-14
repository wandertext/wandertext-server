export default function(collection, { db }) {
  return db[collection]
    .findAll()
    .then(objects => objects)
    .catch(error => console.log(error));
}
