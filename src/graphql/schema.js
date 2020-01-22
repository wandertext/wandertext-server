import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar JSON
  scalar DateTime

  type Contributor {
    id: ID!
    authentication: String
    firstName: String
    lastName: String
    enabled: Boolean
    editor: Boolean
    admin: Boolean
    createdAt: DateTime
    modifiedAt: DateTime
    entries: [Entry]
    texts: [Text]
    flags: [Flag]
  }

  type Entry {
    id: ID!
    properties: JSON
    attestedName: String
    note: String
    createdAt: DateTime
    modifiedAt: DateTime
    contributors: [Contributor]
    text: Text
    place: Place
    placeId: String
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
    createdAt: DateTime
    modifiedAt: DateTime
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
    createdAt: DateTime
    modifiedAt: DateTime
    contributors: [Contributor]
    sortedEntryIds: [String]
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
    createdAt: DateTime
    modifiedAt: DateTime
    entries: [Entry]
    contributors: [Contributor]
    flags: [Flag]
  }

  type Query {
    contributor(id: ID!): Contributor
    contributors: [Contributor]!
    entries: [Entry]
    entry(id: ID!): Entry
    places: [Place]
    place(id: ID!): Place
    text(id: ID!): Text
    texts: [Text]!
    publicTexts: [Text]
  }

  type Mutation {
    editEntry(entryJSON: JSON!, contributorId: ID!): entryResponse!
  }

  type entryResponse {
    success: Boolean!
    newEntry: Boolean!
    message: String
    entry: Entry
  }
`;

export default typeDefs;
