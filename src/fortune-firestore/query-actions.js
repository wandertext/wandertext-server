// options can include:
// sort
// fields
// exists
// match
// range
// limit
// offset
// and
// or
// query

exports.match = (ref, matchQuery) => {
  Object.keys(matchQuery).forEach(field => {
    ref = ref.where(field, "==", matchQuery[field][0]);
  });
  return ref;
};

exports.fields = (ref, fieldsQuery, typeMap) => {
  console.log(typeMap);
  return ref;
};

exports.limit = ref => {
  return ref;
};

exports.sort = ref => {
  return ref;
};
