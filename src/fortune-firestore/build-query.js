const queryActions = require("./query-actions");

const buildQuery = function(ref, options) {
  Object.keys(options).forEach(action => {
    ref = queryActions[action](ref, options[action]);
  });

  // Save orderBy for penultimate.

  // Save the limit for last.
  if (options.limit) {
    return ref.limit(options.limit);
  }

  return ref;
};

module.exports = buildQuery;
