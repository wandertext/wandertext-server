const fs = require("fs");

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkDelete("places", null, {});
    const places = JSON.parse(
      fs.readFileSync("./firestore-data/places-pg.json")
    );
    return queryInterface.bulkInsert(
      "places",
      places.map(
        ({
          id,
          confidence,
          note,
          longitude,
          geonameId,
          bbox,
          source,
          latitude,
          name,
          nywalkerProperties,
          createdOn,
          modifiedOn
        }) => {
          let created_at = new Date();
          let modified_at = created_at;
          if (!source) {
            source = "";
          }

          if (createdOn) {
            created_at = new Date(createdOn["_seconds"] * 1000);
          }

          if (modifiedOn) {
            modified_at = new Date(modifiedOn["_seconds"] * 1000);
          }

          return {
            id,
            confidence,
            note,
            longitude,
            geoname_id: geonameId,
            bbox,
            source,
            latitude,
            nywalker_properties: JSON.stringify(nywalkerProperties),
            name,
            created_at,
            modified_at
          };
        }
      )
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("places", null, {});
  }
};
