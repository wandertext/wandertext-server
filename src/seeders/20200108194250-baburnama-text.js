"use strict";

module.exports = {
  up: async queryInterface => {
    const contributors = await queryInterface.sequelize.query(
      "SELECT id from contributors;"
    );
    const contributor_id = contributors[0][0].id;
    await queryInterface.bulkInsert(
      "texts",
      [
        {
          id: "baburnama-1530",
          name: "baburnama",
          year: 1530,
          markdown_name: "_Bāburnāma_",
          markdown_blurb: "*Wandertext-dev blurb*",
          entry_sort: ["page", "sequence"],
          entry_properties: JSON.stringify([
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
          })
        }
      ],
      {}
    );

    await queryInterface.bulkInsert("contributor_text", [
      {
        contributor_id,
        text_id: "baburnama-1530"
      }
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete("texts", null, {});
    await queryInterface.bulkDelete("contributor_text", null, {});
  }
};
