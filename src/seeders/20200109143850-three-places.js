"use strict";

module.exports = {
  up: async queryInterface => {
    const contributors = await queryInterface.sequelize.query(
      "SELECT id FROM contributors;"
    );
    const contributor_id = contributors[0][0].id;
    await queryInterface.bulkInsert(
      "places",
      [
        {
          id: "agra",
          latitude: 27.18,
          longitude: 78.02,
          name: "آگرہ",
          source: "GeoNames",
          geoname_id: 1279259
        },
        {
          id: "belarus",
          latitude: 52,
          longitude: 27,
          name: "Belarus",
          source: "GeoNames",
          geoname_id: 630336
        },
        {
          id: "chile",
          latitude: -30,
          longitude: -71,
          name: "Chile",
          source: "GeoNames",
          geoname_id: 3895114
        }
      ],
      {}
    );
    await queryInterface.bulkInsert("contributor_place", [
      { contributor_id, place_id: "agra" },
      {
        contributor_id,
        place_id: "belarus"
      },
      { contributor_id, place_id: "chile" }
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete("places", null, {});
    await queryInterface.bulkDelete("contributor_place", null, {});
  }
};
