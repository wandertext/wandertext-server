import { firestore } from "firebase-admin";

export default function(childrenType, parentId, parentType) {
  return firestore()
    .collection(childrenType)
    .where(parentType, "==", parentId)
    .get()
    .then(ref => ref.docs.map(doc => doc.data()))
    .catch(error => console.log(error));
}
