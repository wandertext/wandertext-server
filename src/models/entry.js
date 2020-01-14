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
        field: "attested_name",
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
    { sequelize, timestamps: false, modelName: "entry" }
  );
}
