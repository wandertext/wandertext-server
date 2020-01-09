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
        "contributors_entries",
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
    await queryInterface.bulkDelete("contributors_entries", null, {});
  }
};
