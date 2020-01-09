"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "contributors",
      [
        {
          id: uuidv4(),
          first_name: "Moacir",
          last_name: "bogmore",
          enabled: true,
          created_on: new Date(),
          modified_on: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("contributors", null, {});
  }
};
