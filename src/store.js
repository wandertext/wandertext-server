/* eslint camelcase: 0 unicorn/new-for-builtins: 0 */
const fortune = require("fortune");
const { firestoreAdapter } = require("./fortune-firestore");

exports.store = function() {
  return fortune(
    {
      contributor: {
        authentication: String,
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
        entryProperties: Array,
        entrySort: Array,
        createdOn: Date,
        modifiedOn: Date,
        contributors: [Array("contributor"), "texts"],
        flags: [Array("flag"), "text"],
        entries: [Array("entry"), "text"]
      },
      entry: {
        attestedName: String,
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
        latitude: Number,
        longitude: Number,
        geonameId: Number,
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
        firestoreAdapter,
        {
          typeMap: {
            contributor: "contributors",
            entry: "entries",
            flag: "flags",
            place: "places",
            text: "texts"
          },
          namespace: "",
          projectId: process.env.FIRESTORE_PROJECT_ID,
          client_email: process.env.FIRESTORE_CLIENT_EMAIL,
          private_key: process.env.FIRESTORE_PRIVATE_KEY
        }
      ]
    }
  );
};
