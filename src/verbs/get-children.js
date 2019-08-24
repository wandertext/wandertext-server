export default function(childrenType, parentId, parentType, { db }) {
  return db
    .collection(childrenType)
    .where(parentType, "==", parentId)
    .get()
    .then(ref => ref.docs.map(doc => doc.data()))
    .catch(error => console.log(error));
}
