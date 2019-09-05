import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar JSON
  scalar Timestamp

  type Text {
    id: ID!
    name: String!
    popupTemplate: String
    markdownName: String
    markdownBlurb: String
    url: String
    imgSrc: String
    imgCredit: String
    imgHref: String
    year: Int
    entryCount: Int
    entryProperties: [EntryProperty]
    entrySort: [String]
    createdOn: Timestamp
    modifiedOn: Timestamp
    contributors: [Contributor]
    sortedEntries: [Entry]
    # sortedEntries will be returned in an SortedEntryFeed wrapper
    sortedEntryFeed(cursor: String, limit: Int): SortedEntryFeed
    flags: [Flag]
  }

  type EntryProperty {
    name: String
    type: String
    help: String
    readOnly: Boolean
    inputLabel: String
    # owner is not always an actual contributor
    owner: String
    nullable: Boolean
  }

  type Entry {
    id: ID!
    properties: JSON
    attestedName: String
    note: String
    createdOn: Timestamp
    modifiedOn: Timestamp
    contributors: [Contributor]
    place: Place
    flags: [Flag]
  }

  type SortedEntryFeed {
    cursor: String!
    sortedEntries: [Entry]!
  }

  type Contributor {
    id: ID!
    authentication: String
    firstName: String
    lastName: String
    enabled: Boolean
    editor: Boolean
    admin: Boolean
    createdOn: Timestamp
    modifiedOn: Timestamp
    entries: [Entry]
    texts: [Text]
    flags: [Flag]
  }

  type Place {
    id: ID!
    name: String!
    note: String
    source: String
    latitude: Float
    longitude: Float
    geonameId: Int
    confidence: Int
    createdOn: Timestamp
    modifiedOn: Timestamp
    entries: [Entry]
    contributors: [Contributor]
    flags: [Flag]
  }

  type Flag {
    id: ID!
    comment: String!
    createdOn: Timestamp
    modifiedOn: Timestamp
    entry: Entry
    place: Place
    text: Text
    contributor: Contributor
  }

  type Query {
    contributor(id: ID!): Contributor
    contributors: [Contributor]
    entries: [Entry]
    places: [Place]
    place(id: ID!): Place
    text(id: ID!): Text
    texts: [Text]
    publicTexts: [Text]
  }

  type Mutation {
    updateEntry(
      id: ID!
      attestedName: String
      properties: JSON
      contributor: ID!
    ): updateEntryResponse!
  }

  type updateEntryResponse {
    contributor: String
    success: Boolean!
    message: String
    entry: Entry
  }
`;

export default typeDefs;
