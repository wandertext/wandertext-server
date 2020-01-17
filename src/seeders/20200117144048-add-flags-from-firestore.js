const fs = require("fs");

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkDelete("flags", null, {});
    const flags = JSON.parse(fs.readFileSync("./firestore-data/texts-pg.json"));
    return queryInterface.bulkInsert(
      "flags",
      flags.map(
        ({
          id,
          comment,
          nywalkerProperties,
          createdOn,
          modifiedOn
        }) => {
          let created_at = new Date();
          let modified_at = created_at;
          if (!comment) {
            comment = "";
          }

          if (createdOn) {
            created_at = new Date(createdOn["_seconds"] * 1000);
          }

          if (modifiedOn) {
            modified_at = new Date(modifiedOn["_seconds"] * 1000);
          }

          return {
            id,
            comment,
            nywalker_properties: JSON.stringify(nywalkerProperties),
            created_at,
            modified_at
          };
        }
      )
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("flags", null, {});
  }
};
