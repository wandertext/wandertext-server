"use strict";

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      "places",
      [
        {
          id: "agra",
          latitude: 27.18,
          longitude: 78.02,
          name: "آگرہ",
          source: "GeoNames",
          created_on: new Date(),
          modified_on: new Date(),
          geoname_id: 1279259
        },
        {
          id: "belarus",
          latitude: 52,
          longitude: 27,
          name: "Belarus",
          source: "GeoNames",
          created_on: new Date(),
          modified_on: new Date(),
          geoname_id: 630336
        },
        {
          id: "chile",
          latitude: -30,
          longitude: -71,
          name: "Chile",
          source: "GeoNames",
          created_on: new Date(),
          modified_on: new Date(),
          geoname_id: 3895114
        }
      ],
      {}
    );

    const contributors = await queryInterface.sequelize.query(
      "SELECT id FROM contributors;"
    );

    const contributor_id = contributors[0][0].id;

    return queryInterface.bulkInsert("contributor_places", [
      { contributor_id, place_id: "agra", created_on: new Date() },
      {
        contributor_id,
        place_id: "belarus",
        created_on: new Date()
      },
      { contributor_id, place_id: "chile", created_on: new Date() }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("places", null, {});
    return queryInterface.bulkDelete("contributor_places", null, {});
  }
};
