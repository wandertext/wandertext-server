import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar JSON
  scalar Timestamp

  type Contributor {
    id: ID!
    authentication: String
    firstName: String
    lastName: String
    enabled: Boolean
    editor: Boolean
    admin: Boolean
    createdAt: Timestamp
    modifiedAt: Timestamp
    entries: [Entry]
    texts: [Text]
    flags: [Flag]
  }

  type Entry {
    id: ID!
    properties: JSON
    attestedName: String
    note: String
    createdAt: Timestamp
    modifiedAt: Timestamp
    contributors: [Contributor]
    text: Text
    place: Place
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

  type Flag {
    id: ID!
    comment: String!
    createdAt: Timestamp
    modifiedAt: Timestamp
    entry: Entry
    place: Place
    text: Text
    contributor: Contributor
  }

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
    entries: [Entry]
    properties: JSON
    createdAt: Timestamp
    modifiedAt: Timestamp
    contributors: [Contributor]
    sortedEntries: [String]
    sortedEntryFeed(cursor: String, limit: Int): SortedEntryFeed
    flags: [Flag]
  }

  type SortedEntryFeed {
    cursor: String!
    sortedEntries: [Entry]!
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
    createdAt: Timestamp
    modifiedAt: Timestamp
    entries: [Entry]
    contributors: [Contributor]
    flags: [Flag]
  }

  type Query {
    contributor(id: ID!): Contributor
    contributors: [Contributor]!
    entries: [Entry]
    places: [Place]
    place(id: ID!): Place
    text(id: ID!): Text
    texts: [Text]!
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
