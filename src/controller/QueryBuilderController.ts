import { QueryBuilderInterface } from "../interfaces/RouterInterface";
import getQueryBuilderModel from "../model/QueryBuilder";

export default class QueryParamController {
  private logInfo: Function;
  private logError: Function;
  private sequelize: any;
  private paramObj: any;

  constructor(paramObj: any) {
    this.paramObj = paramObj;
    this.sequelize = paramObj.database;
    this.logInfo = (msg: string) =>
      paramObj.logger.info(
        `Severino Builder - Dynamic QueryParamController Controller() - ${msg}`
      );
    this.logError = (msg: string) =>
      paramObj.logger.error(
        `Severino Builder - Dynamic QueryParamController Controller() - ${msg}`
      );
  }

  public loadRoutes = async (): Promise<QueryBuilderInterface[]> => {
    this.logInfo("Initializing loadRoutes().");
    const routes: QueryBuilderInterface[] = [];

    try {
      const result = await getQueryBuilderModel(this.paramObj).findAll();

      for (const row of result) {
        let table: QueryBuilderInterface = {
          key: row.key,
          value: row.value,
          has_sub: row.has_sub,
        };
        routes.push(table);
      }
    } catch (error) {
      this.logError(`Error in loadRoutes(): ${error}`);
    }

    return routes;
  };
}
