import { Request, Response } from "express";
import QueryBuilderController from "../controller/QueryBuilderController";
import { newQueryForQueryBuilder } from "../helpers/urlParams";
import { QueryTypes } from "sequelize";
import { QueryBuilderInterface } from "../interfaces/RouterInterface";

module.exports = QueryBuilder;

function QueryBuilder(this: any, paramObj: any) {
  this.VERSION = "2024-04-06";

  const logger = paramObj.logger;
  const sequelize = paramObj.database;
  logger.info("Initializing QueryBuilder.");

  const express = paramObj.express;
  this.router = express.Router();

  const queryParamController = new QueryBuilderController(paramObj);

  this.router.get("/ping", (req: Request, res: Response) => {
    res.set("Content-Type", "application/json");
    res.status(200).send({
      resp: "pong",
    });
    res.end();
  });

  let loadExtraRoutes = async () => {
    const routes: QueryBuilderInterface[] =
      await queryParamController.loadRoutes();

    for (const route of routes) {
      this.router.get(`/${route.key}`, (req: Request, res: Response) => {
        res.set("Content-Type", "application/json");

        const query = newQueryForQueryBuilder(route.value, req.query);
        //route.has_sub
        console.log("tttttttt");
        console.log(query);
        console.log("tttttttt");

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
