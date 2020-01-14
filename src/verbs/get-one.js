export default function(collection, id, { db }) {
  return db[collection]
    .findByPk(id)
    .then(object => object)
    .catch(error => console.log(error));
}
