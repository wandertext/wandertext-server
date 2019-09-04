import getAll from "../../verbs/get-all";
import getOne from "../../verbs/get-one";

const Query = {
  contributor: (_, { id }, context) => getOne("contributors", id, context),
  contributors: (_, __, context) => getAll("contributors", context),
  entries: (_, __, context) => getAll("entries", context),
  places: (_, __, context) => getAll("places", context),
  place: (_, { id }, context) => getOne("places", id, context),
  text: (_, { id }, context) => getOne("texts", id, context),
  texts: (_, __, context) => getAll("texts", context),
  publicTexts: (_, __, context) =>
    context.db
      .collection("texts")
      .where("public", "==", true)
      .get()
      .then(ref => ref.docs.map(doc => doc.data()))
      .catch(error => console.log(error))
};

export default Query;
