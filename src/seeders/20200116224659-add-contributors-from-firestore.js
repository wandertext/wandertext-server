const fs = require("fs");

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkDelete("contributors", null, {});
    const contributors = JSON.parse(
      fs.readFileSync("./firestore-data/contributors-pg.json")
    );
    return queryInterface.bulkInsert(
      "contributors",
      contributors.map(
        ({
          id,
          email,
          nywalkerProperties,
          lastName,
          firstName,
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
            email,
            nywalker_properties: JSON.stringify(nywalkerProperties),
            editor: false,
            last_name: lastName,
            first_name: firstName,
            authentication: "nywalker",
            enabled: false,
            admin: false,
            created_at,
            modified_at
          };
        }
      )
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("contributors", null, {});
  }
};
