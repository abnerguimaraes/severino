import { Request, Response } from "express";
import QueryParamController from "../controller/QueryParamController";
import { newQueryForQueryParam } from "../helpers/urlParams";
import { QueryTypes } from "sequelize";
import { QueryParamInterface } from "../interfaces/RouterInterface";

module.exports = QueryParam;

function QueryParam(this: any, paramObj: any) {
  this.VERSION = "2024-04-06";

  const logger = paramObj.logger;
  const sequelize = paramObj.database;
  logger.info("Initializing QueryParam.");

  const express = paramObj.express;
  this.router = express.Router();

  const queryParamController = new QueryParamController(paramObj);

  this.router.get("/ping", (req: Request, res: Response) => {
    res.set("Content-Type", "application/json");
    res.status(200).send({
      resp: "pong",
    });
    res.end();
  });

  let loadExtraRoutes = async () => {
    const routes: QueryParamInterface[] =
      await queryParamController.loadRoutes();

    for (const route of routes) {
      this.router.get(`/${route.key}`, (req: Request, res: Response) => {
        res.set("Content-Type", "application/json");

        const query = newQueryForQueryParam(route.value, req.query);

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
    logger.info("QueryParam loaded.");
  };

  loadExtraRoutes();
}
