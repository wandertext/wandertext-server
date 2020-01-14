import { Model } from "sequelize";

class Contributor extends Model {}

export default function(sequelize, type) {
  return Contributor.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: type.TEXT,
        defaultValue: type.UUIDV4
      },
      firstName: {
        field: "first_name",
        type: type.TEXT,
        allowNull: false
      },
      lastName: {
        field: "last_name",
        type: type.TEXT
      },
      enabled: {
        allowNull: false,
        type: type.BOOLEAN,
        defaultValue: false
      },
      editor: {
        allowNull: false,
        type: type.BOOLEAN,
        defaultValue: false
      },
      admin: {
        allowNull: false,
        type: type.BOOLEAN,
        defaultValue: false
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
    { sequelize, timestamps: false, modelName: "contributor" }
  );
}
