import { Model } from "sequelize";

class Text extends Model {}

export default function(sequelize, type) {
  return Text.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: type.TEXT
      },
      name: {
        allowNull: false,
        type: type.TEXT
      },
      year: {
        type: type.INTEGER
      },
      markdownName: {
        field: "markdown_name",
        type: type.TEXT
      },
      markdownBlurb: {
        field: "markdown_blurb",
        type: type.TEXT
      },
      url: {
        type: type.TEXT
      },
      imgSrc: {
        field: "img_src",
        type: type.TEXT
      },
      imgCredit: {
        field: "img_credit",
        type: type.TEXT
      },
      imgHref: {
        field: "img_href",
        type: type.TEXT
      },
      entryProperties: {
        field: "entry_properties",
        type: type.JSONB
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      },
      modifiedAt: {
        field: "modified_at",
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      }
    },
    { sequelize, timestamps: false, modelName: "text" }
  );
}
