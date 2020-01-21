import getAll from "../../verbs/get-all";
import getOne from "../../verbs/get-one";

const Query = {
  contributor: (_, { id }, context) => getOne("Contributor", id, context),
  contributors: (_, __, context) => getAll("Contributor", context),
  entries: (_, __, context) => getAll("Entry", context),
  places: (_, __, context) => getAll("Place", context),
  place: (_, { id }, context) => getOne("Place", id, context),
  texts: (_, __, context) => getAll("Text", context),
  text: (_, { id }, context) => getOne("Text", id, context),
  // text: (_, { id }, { db }) =>
  //   db
  //     .doc(`texts/${id}`)
  //     .get()
  //     .then(d => {
  //       const data = d.data();
  //       data.entryCount = data.sortedEntryIds.length;
  //       return data;
  //     })
  //     .catch(error => console.log(error)),
  // texts: (_, __, context) => getAll("texts", context),
  // publicTexts: (_, __, { db }) =>
  //   db
  //     .collection("texts")
  //     .where("public", "==", true)
  //     .get()
  //     .then(ref => ref.docs.map(doc => doc.data()))
  //     .catch(error => console.log(error))
};

export default Query;
