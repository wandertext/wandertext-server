"use strict";

module.exports = {
  up: async queryInterface => {
    const contributors = await queryInterface.sequelize.query(
      "SELECT id FROM contributors;"
    );
    const contributorId = contributors[0][0].id;
    await queryInterface.bulkInsert(
      "places",
      [
        {
          id: "agra",
          latitude: 27.18,
          longitude: 78.02,
          name: "آگرہ",
          source: "GeoNames",
          geonameId: 1279259
        },
        {
          id: "belarus",
          latitude: 52,
          longitude: 27,
          name: "Belarus",
          source: "GeoNames",
          geonameId: 630336
        },
        {
          id: "chile",
          latitude: -30,
          longitude: -71,
          name: "Chile",
          source: "GeoNames",
          geonameId: 3895114
        }
      ],
      {}
    );
    await queryInterface.bulkInsert("contributor_place", [
      { contributorId, placeId: "agra", createdOn: new Date() },
      {
        contributorId,
        placeId: "belarus",
        createdOn: new Date()
      },
      { contributorId, placeId: "chile", createdOn: new Date() }
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete("places", null, {});
    await queryInterface.bulkDelete("contributor_place", null, {});
  }
};
