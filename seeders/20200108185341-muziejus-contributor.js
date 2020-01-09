"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "contributors",
      [
        {
          id: uuidv4(),
          firstName: "Moacir",
          createdOn: new Date(),
          updatedOn: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("contributors", null, {});
  }
};
