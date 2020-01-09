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
          markdown_name: "_Bāburnāma_",
          markdown_blurb: "*Wandertext-dev blurb*",
          entry_properties: JSON.stringify([
            {
              name: "page",
              type: "number",
              help: "thee page number",
              input_label: "Page"
            },
            {
              name: "sequence",
              type: "number",
              input_label: "Seq."
            },
            {
              name: "special",
              help: "something special",
              input_label: "Speciale"
            },
            {
              name: "tree",
              help: "A Tree",
              input_abel: "Treee"
            }
          ]),
          properties: JSON.stringify({
            translator: "Annette Beveridge"
          }),
          created_on: new Date(),
          modified_on: new Date()
        }
      ],
      {}
    );

    const contributors = await queryInterface.sequelize.query(
      "SELECT id from contributors;"
    );

    const contributor_id = contributors[0][0].id;

    return queryInterface.bulkInsert("contributor_texts", [
      {
        contributor_id,
        text_id: "baburnama-1530",
        created_on: new Date()
      }
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete("texts", null, {});
    await queryInterface.bulkDelete("contributor_texts", null, {});
  }
};
