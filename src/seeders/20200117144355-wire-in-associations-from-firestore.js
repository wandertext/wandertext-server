const fs = require("fs");

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkDelete("contributor_text", null, {});
    await queryInterface.bulkDelete("contributor_entry", null, {});
    await queryInterface.bulkDelete("contributor_place", null, {});
    const texts = JSON.parse(fs.readFileSync("./firestore-data/texts-pg.json"));
    const places = JSON.parse(
      fs.readFileSync("./firestore-data/places-pg.json")
    );
    const entries = JSON.parse(
      fs.readFileSync("./firestore-data/entries-pg.json")
    );
    for (const place of places) {
      const { contributors, id } = place;
      await queryInterface.bulkInsert(
        "contributor_place",
        contributors.map(contributor => {
          return {
            created_at: new Date(),
            contributor_id: contributor,
            place_id: id
          };
        })
      );
    }
    for (const text of texts) {
      const { contributors, id } = text;
      await queryInterface.bulkInsert(
        "contributor_text",
        contributors.map(contributor => {
          return {
            created_at: new Date(),
            contributor_id: contributor,
            text_id: id
          };
        })
      );
    }
    for (const entry of entries) {
      const { contributors, id } = entry;
      await queryInterface.bulkInsert(
        "contributor_entry",
        contributors.map(contributor => {
          return {
            created_at: new Date(),
            contributor_id: contributor,
            entry_id: id
          };
        })
      );
    }
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete("contributor_text", null, {});
    await queryInterface.bulkDelete("contributor_entry", null, {});
    await queryInterface.bulkDelete("contributor_place", null, {});
  }
};
