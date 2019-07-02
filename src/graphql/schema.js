import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar JSON

  type Text {
    id: ID!
    name: String!
    popupTemplate: String
    markdownName: String
    markdownBlurb: String
    imgSrc: String
    imgCredit: String
    imgHref: String
    year: Int
    entryProperties: [EntryProperty]
    entrySort: [String]
    contributors: [Contributor]
    entries: [Entry]
    flags: [Flag]
  }

  type EntryProperty {
    name: String
    type: String
    help: String
    readOnly: Boolean
    inputLabel: String
    owner: Contributor
    nullable: Boolean
  }

  type Entry {
    id: ID!
    properties: JSON
    attestedName: String
    note: String
    contributors: [Contributor]
    place: Place
    flags: [Flag]
  }

  type Contributor {
    id: ID!
    authentication: String
    firstName: String
    lastName: String
    enabled: Boolean
    editor: Boolean
    admin: Boolean
    entries: [Entry]
    texts: [Text]
  }

  type Place {
    id: ID!
    name: String!
    note: String
    latitude: Float
    longitude: Float
    geonameId: Int
    confidence: Int
    bbox: String
    source: String
  }

  type Flag {
    id: ID!
    comment: String!
    entry: Entry
    place: Place
    text: Text
    contributor: Contributor
  }

  type Query {
    contributor(id: ID!): Contributor
    contributors: [Contributor]
    entries: [Entry]
    place(id: ID!): Place
    text(id: ID!): Text
    texts: [Text]
  }
`;

export default typeDefs;
