import Sequelize, { Model } from "sequelize";

export class QueryParamModel extends Model {
  public id!: number;
  public key!: string;
  public value!: string;
}

export default function (paramObj: any) {
  QueryParamModel.init(
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: paramObj.database,
      tableName: "query_param",
      timestamps: false,
    }
  );

  return QueryParamModel;
}
