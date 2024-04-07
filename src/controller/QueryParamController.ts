import { QueryParamInterface } from "../interfaces/RouterInterface";
import getQueryParamModel from "../model/QueryParam";

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

  public loadRoutes = async (): Promise<QueryParamInterface[]> => {
    this.logInfo("Initializing loadRoutes().");
    const routes: QueryParamInterface[] = [];

    try {
      const result = await getQueryParamModel(this.paramObj).findAll();

      for (const row of result) {
        let table: QueryParamInterface = {
          key: row.key,
          value: row.value,
        };
        routes.push(table);
      }
    } catch (error) {
      this.logError(`Error in loadRoutes(): ${error}`);
    }

    return routes;
  };
}
