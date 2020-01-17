const fs = require("fs");

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkDelete("entries", null, {});
    const entries = JSON.parse(fs.readFileSync("./firestore-data/entries-pg.json"));
    return queryInterface.bulkInsert(
      "entries",
      entries.map(
        ({
          id,
          attestedName,
          place,
          text,
          properties,
          nywalkerProperties,
          createdOn,
          modifiedOn
        }) => {
          let created_at = new Date();
          let modified_at = created_at;
          if (createdOn) {
            created_at = new Date(createdOn["_seconds"] * 1000);
          }

          if (modifiedOn) {
            modified_at = new Date(modifiedOn["_seconds"] * 1000);
          }

          return {
            id,
            attested_name: attestedName,
            place_id: place,
            text_id: text,
            properties: JSON.stringify(properties),
            nywalker_properties: JSON.stringify(nywalkerProperties),
            created_at,
            modified_at
          };
        }
      )
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("entries", null, {});
  }
};
