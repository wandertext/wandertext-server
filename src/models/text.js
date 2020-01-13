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
        type: type.TEXT
      },
      markdownBlurb: {
        type: type.TEXT
      },
      url: {
        type: type.TEXT
      },
      imgSrc: {
        type: type.TEXT
      },
      imgCredit: {
        type: type.TEXT
      },
      imgHref: {
        type: type.TEXT
      },
      entryProperties: {
        type: type.JSONB
      },
      createdOn: {
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      },
      modifiedOn: {
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      }
    },
    { sequelize, timestamps: false, modelName: "text" }
  );
}
