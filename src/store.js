/* eslint camelcase: 0 unicorn/new-for-builtins: 0 */
const fortune = require("fortune");
const postgresAdapter = require("fortune-postgres");

export default function() {
  return fortune(
    {
      contributor: {
        firstName: String,
        lastName: String,
        enabled: Boolean,
        editor: Boolean,
        admin: Boolean,
        createdOn: Date,
        modifiedOn: Date,
        texts: [Array("text"), "contributors"],
        places: [Array("place"), "contributors"],
        flags: [Array("flag"), "contributor"],
        entries: [Array("entry"), "contributors"]
      },
      text: {
        name: String,
        markdownName: String,
        markdownBlurb: String,
        imgHref: String,
        imgSrc: String,
        imgCredit: String,
        year: Number,
        entryProperties: Object,
        properties: Object,
        createdOn: Date,
        modifiedOn: Date,
        contributors: [Array("contributor"), "texts"],
        flags: [Array("flag"), "text"],
        entries: [Array("entry"), "text"]
      },
      entry: {
        attestedName: String,
        note: String,
        properties: Object,
        createdOn: Date,
        modifiedOn: Date,
        text: ["text", "entries"],
        place: ["place", "entries"],
        contributors: [Array("contributor"), "entries"],
        flags: [Array("flag"), "entry"]
      },
      place: {
        name: String,
        note: String,
        source: String,
        latitude: Number,
        longitude: Number,
        geonameId: Number,
        confidence: Number,
        createdOn: Date,
        modifiedOn: Date,
        entries: [Array("entry"), "place"],
        contributors: [Array("contributor"), "places"],
        flags: [Array("flag"), "place"]
      },
      flag: {
        comment: String,
        createdOn: Date,
        modifiedOn: Date,
        entry: ["entry", "flags"],
        place: ["place", "flags"],
        text: ["text", "flags"],
        contributor: ["contributor", "flags"]
      }
    },
    {
      adapter: [
        postgresAdapter,
        {
          typeMap: {
            contributor: "contributors",
            entry: "entries",
            flag: "flags",
            place: "places",
            text: "texts"
          },
          url: "postgres://wandertext:wandertext@localhost:5432/wandertext-dev"
        }
      ]
    }
  );
}
