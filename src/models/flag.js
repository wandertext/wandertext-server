import { Model } from "sequelize";

class Flag extends Model {}

export default function(sequelize, type) {
  return Flag.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: type.TEXT,
        defaultValue: type.UUIDV4
      },
      comment: {
        allowNull: false,
        type: type.TEXT
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
    { sequelize, timestamps: false, modelName: "flag" }
  );
}
