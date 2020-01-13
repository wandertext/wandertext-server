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
        type: type.TEXT,
        allowNull: false
      },
      lastName: {
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
    { sequelize, timestamps: false, modelName: "contributor" }
  );
}
