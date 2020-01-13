import { Model } from "sequelize";

class Entry extends Model {}

export default function(sequelize, type) {
  return Entry.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: type.TEXT,
        defaultValue: type.UUIDV4
      },
      attestedName: {
        allowNull: false,
        type: type.TEXT
      },
      note: {
        type: type.TEXT
      },
      properties: {
        allowNull: false,
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
    { sequelize, timestamps: false, modelName: "entry" }
  );
}
