import Sequelize, { Model } from "sequelize";

export class QueryBuilder extends Model {
  public id!: number;
  public key!: string;
  public value!: string;
  public has_sub!: boolean;
}

export default function (paramObj: any) {
  QueryBuilder.init(
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
      has_sub: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize: paramObj.database,
      tableName: "query_builder",
      timestamps: false,
    }
  );

  return QueryBuilder;
}
