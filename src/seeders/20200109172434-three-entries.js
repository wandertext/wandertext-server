"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: async queryInterface => {
    const contributors = await queryInterface.sequelize.query(
      "SELECT id FROM contributors;"
    );
    const contributor_id = contributors[0][0].id;
    const text_id = "baburnama-1530";
    const ids = [uuidv4(), uuidv4(), uuidv4()];

    await queryInterface.bulkInsert(
      "entries",
      [
        {
          id: ids[0],
          attested_name: "Agra",
          text_id,
          place_id: "agra",
          properties: JSON.stringify({
            page: 3,
            sequence: 2,
            special: "Agra specialty"
          })
        },
        {
          id: ids[1],
          attested_name: "Беларусь",
          text_id,
          place_id: "belarus",
          properties: JSON.stringify({
            page: 1,
            sequence: 3,
            special: "Belarusian specialty"
          })
        },
        {
          id: ids[2],
          attested_name: "Chile",
          text_id,
          place_id: "chile",
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
        "contributor_entry",
        [
          {
            contributor_id,
            entry_id
          }
        ],
        {}
      );
    }
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete("entries", null, {});
    await queryInterface.bulkDelete("contributor_entry", null, {});
  }
};
