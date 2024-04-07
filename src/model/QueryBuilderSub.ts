import Sequelize, { Model } from "sequelize";

export class QueryBuilderSub extends Model {
  public id!: number;
}

export default function (paramObj: any) {
  QueryBuilderSub.init(
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_query_builder: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      alias_name: {
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
      tableName: "query_builder_sub",
      timestamps: false,
    }
  );

  return QueryBuilderSub;
}
