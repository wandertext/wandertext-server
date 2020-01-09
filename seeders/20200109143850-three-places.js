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
          createdOn: new Date(),
          updatedOn: new Date(),
          geonameId: 1279259
        },
        {
          id: "belarus",
          latitude: 52,
          longitude: 27,
          name: "Belarus",
          source: "GeoNames",
          createdOn: new Date(),
          updatedOn: new Date(),
          geonameId: 630336
        },
        {
          id: "chile",
          latitude: -30,
          longitude: -71,
          name: "Chile",
          source: "GeoNames",
          createdOn: new Date(),
          updatedOn: new Date(),
          geonameId: 3895114
        }
      ],
      {}
    );

    const contributors = await queryInterface.sequelize.query(
      "SELECT id FROM contributors;"
    );

    const contributorId = contributors[0][0].id;

    return queryInterface.bulkInsert("contributorPlaces", [
      { contributorId, placeId: "agra", createdOn: new Date() },
      {
        contributorId,
        placeId: "belarus",
        createdOn: new Date()
      },
      { contributorId, placeId: "chile", createdOn: new Date() }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("places", null, {});
  }
};
