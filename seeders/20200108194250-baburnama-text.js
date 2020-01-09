"use strict";

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      "texts",
      [
        {
          id: "baburnama-1530",
          name: "baburnama",
          year: 1530,
          markdownName: "_Bāburnāma_",
          markdownBlurb: "*Wandertext-dev blurb*",
          entryProperties: JSON.stringify([
            {
              name: "page",
              type: "number",
              help: "thee page number",
              inputLabel: "Page"
            },
            {
              name: "sequence",
              type: "number",
              inputLabel: "Seq."
            },
            {
              name: "special",
              help: "something special",
              inputLabel: "Speciale"
            },
            {
              name: "tree",
              help: "A Tree",
              inputLabel: "Treee"
            }
          ]),
          properties: JSON.stringify({
            translator: "Annette Beveridge"
          }),
          createdOn: new Date(),
          updatedOn: new Date()
        }
      ],
      {}
    );

    const contributors = await queryInterface.sequelize.query(
      "SELECT id from contributors;"
    );

    const contributorId = contributors[0][0].id;

    return queryInterface.bulkInsert("contributorTexts", [
      {
        contributorId,
        textId: "baburnama-1530",
        createdOn: new Date()
      }
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete("texts", null, {});
    await queryInterface.bulkDelete("contributorTexts", null, {});
  }
};
