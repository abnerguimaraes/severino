import { Request, Response } from "express";
import TableRoutes from "../controller/TableRoutes";
import { complementUrl } from "../helpers/urlParams";
import { QueryTypes } from "sequelize";

module.exports = DynamicRoutes;

function DynamicRoutes(this: any, paramObj: any) {
  this.VERSION = "2024-04-06";

  const logger = paramObj.logger;
  const sequelize = paramObj.database;
  logger.info("Initializing DynamicRoutes.");

  const express = paramObj.express;
  this.router = express.Router();

  const tableRoutes = new TableRoutes(paramObj);

  this.router.get("/ping", (req: Request, res: Response) => {
    res.set("Content-Type", "application/json");
    res.status(200).send({
      resp: "pong",
    });
    res.end();
  });

  let loadExtraRoutes = async () => {
    const routes = await tableRoutes.loadRoutes();

    for (const route of routes) {
      this.router.get(`/${route.table_name}`, (req: Request, res: Response) => {
        res.set("Content-Type", "application/json");

        const extraParams = complementUrl(req.query);
        const query = `select * from ${route.table_name} ${extraParams}`;

        sequelize
          .query(query, { type: QueryTypes.SELECT })
          .then((records: any) => {
            res.status(200).send({
              records: records,
            });
            logger.info(`Response sent to client.`);
            res.end();
          });
      });
    }
    logger.info("DynamicRoutes loaded.");
  };

  loadExtraRoutes();
}
