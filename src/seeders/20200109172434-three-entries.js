"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: async queryInterface => {
    const contributors = await queryInterface.sequelize.query(
      "SELECT id FROM contributors;"
    );
    const contributorId = contributors[0][0].id;
    const textId = "baburnama-1530";
    const ids = [uuidv4(), uuidv4(), uuidv4()];

    await queryInterface.bulkInsert(
      "entries",
      [
        {
          id: ids[0],
          attestedName: "Agra",
          contributors: `{${contributorId}}`,
          textId,
          placeId: "agra",
          properties: JSON.stringify({
            page: 3,
            sequence: 2,
            special: "Agra specialty"
          })
        },
        {
          id: ids[1],
          attestedName: "Беларусь",
          contributors: `{${contributorId}}`,
          textId,
          placeId: "belarus",
          properties: JSON.stringify({
            page: 1,
            sequence: 3,
            special: "Belarusian specialty"
          })
        },
        {
          id: ids[2],
          attestedName: "Chile",
          contributors: `{${contributorId}}`,
          textId,
          placeId: "chile",
          properties: JSON.stringify({
            page: 2,
            sequence: 1,
            special: "Chile chili"
          })
        }
      ],
      {}
    );

    for (const entryId of ids) {
      await queryInterface.bulkInsert(
        "contributor_entry",
        [
          {
            contributorId,
            entryId,
            createdOn: new Date()
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
