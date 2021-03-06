# Wandertext-server

Wandertext-server is the abstraction and reimplementation of the stalled
[nywalker-server](@nyscapes/nywalker-server) project that fueled the old,
[NYU](http://nyu.edu)-hosted NYWalker project. It provides the backend for
[Wandertext](@muziejus/wandertext), the reimplementation of
[NYWalker](@nyscapes/nywalker).

Wandertext-server exposes an [Apollo GraphQL
API](https://www.apollographql.com/) that communicates with a Postgres
database server via [Sequelize](https://sequelize.org/). 

## Schema

The schema is straightforward and described both in `./src/models` and
`.src/graphql/schema.js`. There are five models:

1. `contributor`, which refers to a person creating or editing data in Wandertext. As
   such, they have many of the other four models.
2. `text`, which is the container for single datasets in Wandertext. In
   NYWalker, this model was called a `Book`, but Wandertext lets us build
   different datasets. It has many `contributor` and many `entries`.
3. `place`, which refers to a geographical place. Each place can have many
   `contributors` and
   `entries`.
4. `entry`, which is the atomic driver of the data captured in Wandertext. An
   entry belongs to a `place` and a `text`, but can have many `contributors`. In
   NYWalker, these were called `Instances`.
5. `flag`, which is a meta object. Filled out by a `contributor` (to which it
   belongs), a flag can be attached to a `text`, `place`, or `entry` to alert
   to a problem with that other entity. As such, every model can
   definitionally have many flags, except the flag itself.

### User

* `firstName` (string): The first part of the user’s name, which gets bumped
to after the comma when sorting by “last name.” Hence, in a name like “Moacir
P. de Sá Pereira,” `firstName` would be `"Moacir P. de"`. For a name like “Son
Heung-Min,” it would be `null`.

* `lastName` (string): The second part of the user’s name, or the part that
leads when sorting names alphabetically. From the examples above, we get
values of `"Sá Pereira"` and `"Son Heung-Min"`, meaning that in a
bibliography, the names would appear as:
    * Sá Pereira, Moacir P. de
    * Son Heung-Min

* `enabled` (boolean): Whether a user can log in. Default: `false`.

* `superUser` (boolean): Whether a user can create texts in addition to places
and entries. Default: `false`.

* `admin` (boolean): Whether a user can create new users. God mode. Default:
`false`.

* `createdAt` (date): The creation date for the user.

* `modifiedAt` (date): The modification date for the user.

* `nywalkerProperties` (object): A representation of the user from NYWalker,
should they have existed then. This will include, for example, `id`, `name`,
`email`, `username`, `admin`, `added_on`, `modified_on`, `firstname`,
`lastname`, and `enabled`.

### Text

* `name` (string): An identifier of the text in question.

* `popupTemplate` (string): An HTML/handlebars template that determines how
popups appear in Leaflet for entries associated with this text.

* `markdownName` (string): A Markdown rendering of the name. For example, for
a `name` of `"Bāburnāma"`, the `markdownName` can be `"_Bāburnāma_"`, so that the
name can be rendered in italics.

* `markdownBlurb` (string): A blurb describing the text, written in Markdown.

* `url` (string): A url associated with the text.

* `imgSrc` (string): A url pointing to an image associated with the text. This
can be the cover of a book, say.

* `imgCredit` (string): A string describing how the image should be credited.

* `imgHref` (string): A link that resolves when the user clicks on the image.

* `entryProperties` (array): An array of property objects. A property object
defines a property that entries belonging to this text are expected to have.
For example, if the text is a book, every entry may be expected to have a
`page` property. That is defined here. If a text is a set of interviews, than
every entry (interview) can be expected to have an `interviewee` property.
Furthermore, the order of property objects determines the order in which the
input fields are presented in data entry. Each property object can expect to have
the following properties:
    * `name` (string): The name of the property, such as `"page"` or `"interviewee"`
    * `type` (string): What JavaScript type to expect. One of `"string"`,
    `"number"`, or `"boolean"`.
    * `inputLabel` (string): The label corresponding to the input field for
    adding this property, such as `"Page Number"` or `"Interviewee Code"`.
    * `helpText` (string): The text underneath the input field that appears as
    help text.
    * `readOnly` (boolean): Whether this field can be changed or not. Useful
    when importing previously created data.

* `entrySort` (array): An array of property objects’ `.name` properties,
defining the order in which entries are sorted by default. For a value of
`["page", "sequence"]`, for example, the entries would first be sorted by
their `page` property and then by their `sequence` property.

* `createdOn` (date): The creation date for the text.

* `modifiedOn` (date): The modification date for the text.

* `nywalkerProperties` (object): A list of old properties from NYWalker. This
could include `id`, `slug`, `author`, `title`, `isbn`, `year`, `url`, `cover`,
`added_on`, and `modified_on`.

* `users`: This represents the text’s `hasMany` relations.

### Place

* `type` (string): `"Feature"`

* `bbox` (array): An array representing the bounding box of the place. As the
  [GeoJSON spec](https://tools.ietf.org/html/rfc7946) describes the format:
  “The value of the bbox member MUST be an array of length 2*n where n is the
  number of dimensions represented in the contained geometries, with all axes
  of the most southwesterly point followed by all axes of the more
  northeasterly point.  The axes order of a bbox follows the axes order of
  geometries.”

* `geometry` (object): An object with two properties. `type` defaults to
`"Point"` and `coordinates` is an array of the format `[<longitude>, <latitude>]`.

* `properties` (object): A places properties are all nested in here, in
following the GeoJSON spec. As such:
    * `name` (string): A name for the place
    * `slug` (string): A (hopefully unique), url-safe version of the name.
    * `confidence` (number): A number between 0 and 3 indicating a subjective
    sense of confidence that this is an appropriate representation of the
    place in question.
    * `source` (string): The source for the coordinates. Typical responses are
    a Wikipedia link, [Geonames](http://geonames.org), or Google Maps.
    * `geonameId` (number): If the place is harvested from Geonames, this is
    its id.
    * `note` (string): A note about the place, if needed.
    * `createdOn` (date): The creation date for the place.
    * `modifiedOn` (date): The modification date for the place.
    * `nywalkerProperties` (object): A list of old properties from NYWalker.
    This could include `id`, `slug`, `name`, `added_on`, `lat`, `lon`,
    `confidence` (as string), `source`, `geonameid` (as string), `what3word`,
    `bounding_box_string`, `user_id`, `flagged`, `note`, and `geom`.

* `users`: This represents the place’s `hasMany` relations.

### Entry

* `attestedName` (string): The string by which the entry’s place is referred
to, such as `"NYC"` for the place `"New York City"`.

* `note` (string): A note about the entry.

* `createdOn` (date): The creation date for the entry.

* `modifiedOn` (date): The modification date for the entry.

* `nywalkerProperties` (object): A list of old properties from NYWalker. This
could include `id`, `page`, `sequence`, `text`, `added_on`, `modified_on`,
`place_id`, `user_id`, `book_id`, `flagged`, `note`, and `special`.

* `text` and `place`: These represent the entry’s `belongsTo` relations.

* `users`: This represents the entry’s `hasMany` relations.

### Flag

* `comment` (string): The text of the flag.

* `createdOn` (date): The creation date for the flag.

* `modifiedOn` (date): The modification date for the flag.

* `nywalkerProperties` (object): A list of old properties from NYWalker. This
could include `id`, `comment`, `object_type`, `object_id`, `added_on`, and
`user_id`.

* `user`, `entry`, `text` and `place`: These represent the flag’s `belongsTo` relations.

## Abstraction & Linking

This repository differs from the earlier version in two, fundamental ways,
both of which make the project more viable as a contributor to human
knowledge. 

First, the database’s document structure abstracts the old relational database
data structure of NYWalker. NYWalker had, effectively, three models: `Book`,
`Place`, and `Instance`. `Instance`s belonged to one `Book` and to one
`Place`. Because of that, the data structure of the `Instance` was
predictable. There would be, for example, an integer captured that was the
page number for the `Instance`. Similarly, `Book`, the container object, also
had predictable properties, like an author or an ISBN number. Now, instead of
`Book`, `Instance`s (called `Entry`s belong to an abstract `Text` document. Furthermore, the
data structure of an `Text`’s `Entry`s is defined by the `Text` itself,
not by the schema of the database. In this way, for example, one `Text`
could be a book, where each `Entry` has a page number, while another
`Text` could be an audio recording, where each `Entry` has a timecode.

Second, while NYWalker was designed with open access to its data in mind, it
was implemented in an ad hoc manner, and the relationships between `Place`s
and gazetteers was… inconsistent. Some places were linked to
[GeoNames](http://geonames.org) entries, and many places were not. With
Wandertext, `Place`s will link to the WHGazetteer, contributing to a federated
system of geographical information management.

## Roadmap

1. Convert existing SQL database to sqlite for portability ✅
2. Convert sqlite database (back) to Postgres ✅ 
3. Build Wandertext client
4. Deepen `Place` model to match Linked Places format.
