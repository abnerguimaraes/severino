import { RouterInterface } from "../interfaces/RouterInterface";

export default class TableRoutes {
  private logInfo: Function;
  private logError: Function;
  private sequelize: any;

  constructor(paramObj: any) {
    this.sequelize = paramObj.database;
    this.logInfo = (msg: string) =>
      paramObj.logger.info(
        `Severino Builder - Dynamic TableRoutes Controller() - ${msg}`
      );
    this.logError = (msg: string) =>
      paramObj.logger.error(
        `Severino Builder - Dynamic TableRoutes Controller() - ${msg}`
      );
  }

  public loadRoutes = async (): Promise<RouterInterface[]> => {
    this.logInfo("Initializing loadRoutes().");
    const routes: RouterInterface[] = [];

    try {
      const result = await this.sequelize.query(
        "select * from information_schema.tables",
        {
          type: this.sequelize.QueryTypes.SHOWTABLES,
        }
      );

      for (const row of result) {
        let table: RouterInterface = {
          table_name: row.table_name,
          table_type: row.table_type,
        };
        routes.push(table);
      }
    } catch (error) {
      this.logError(`Error in loadRoutes(): ${error}`);
    }

    return routes;
  };
}
