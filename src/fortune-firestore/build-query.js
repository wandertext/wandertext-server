const queryActions = require("./query-actions");

const buildQuery = function(ref, options, typeMap) {
  Object.keys(options).forEach(action => {
    ref = queryActions[action](ref, options[action], typeMap);
  });

  // Save orderBy for penultimate.
  if (options.sort) {
    Object.keys(options.sort).forEach(sortField => {
      ref = ref.orderBy(sortField);
    });
  }

  // Save the limit for last.
  if (options.limit) {
    ref = ref.limit(options.limit);
  }

  return ref;
};

module.exports = buildQuery;
