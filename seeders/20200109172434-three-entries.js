"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: async queryInterface => {
    const text_id = "baburnama-1530";
    const contributors = await queryInterface.sequelize.query(
      "SELECT id FROM contributors;"
    );
    const contributor_id = contributors[0][0].id;
    const ids = [uuidv4(), uuidv4(), uuidv4()];

    await queryInterface.bulkInsert(
      "entries",
      [
        {
          id: ids[0],
          text_id,
          attested_name: "Agra",
          place_id: "agra",
          created_on: new Date(),
          modified_on: new Date(),
          properties: JSON.stringify({
            page: 3,
            sequence: 2,
            special: "Agra specialty"
          })
        },
        {
          id: ids[1],
          text_id,
          attested_name: "Беларусь",
          place_id: "belarus",
          created_on: new Date(),
          modified_on: new Date(),
          properties: JSON.stringify({
            page: 1,
            sequence: 3,
            special: "Belarusian specialty"
          })
        },
        {
          id: ids[2],
          text_id,
          attested_name: "Chile",
          place_id: "chile",
          created_on: new Date(),
          modified_on: new Date(),
          properties: JSON.stringify({
            page: 2,
            sequence: 1,
            special: "Chile chili"
          })
        }
      ],
      {}
    );

    for (const entry_id of ids) {
      await queryInterface.bulkInsert(
        "contributor_entries",
        [
          {
            contributor_id,
            entry_id,
            created_on: new Date()
          }
        ],
        {}
      );
    }
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete("entries", null, {});
    await queryInterface.bulkDelete("contributor_entries", null, {});
  }
};
