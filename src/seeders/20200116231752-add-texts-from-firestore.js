const fs = require("fs");

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkDelete("texts", null, {});
    const texts = JSON.parse(fs.readFileSync("./firestore-data/texts-pg.json"));
    return queryInterface.bulkInsert(
      "texts",
      texts.map(
        ({
          id,
          name,
          markdownName,
          markdownBlurb,
          year,
          imgCredit,
          imgSrc,
          imgHref,
          entryProperties,
          entrySort,
          sortedEntries,
          nywalkerProperties,
          popupTemplate,
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

          if (sortedEntries.length < 1) {
            sortedEntries = [""];
          }

          return {
            id,
            nywalker_properties: JSON.stringify(nywalkerProperties),
            name,
            markdown_name: markdownName,
            markdown_blurb: markdownBlurb,
            entry_sort: entrySort,
            year,
            img_credit: imgCredit,
            img_src: imgSrc,
            img_href: imgHref,
            sorted_entries: sortedEntries,
            entry_properties: JSON.stringify(entryProperties),
            popup_template: popupTemplate,
            created_at,
            modified_at
          };
        }
      )
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("texts", null, {});
  }
};
