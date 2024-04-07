import { Request, Response } from "express";
module.exports = StaticRoutes;

function StaticRoutes(this: any, paramObj: any) {
  this.VERSION = "2024-04-06";

  const logger = paramObj.logger;
  const express = paramObj.express;
  this.router = express.Router();

  logger.info("Initializing StaticRoutes.");

  this.router.get("/ping", (req: Request, res: Response) => {
    res.set("Content-Type", "application/json");
    res.status(200).send({
      resp: "pong",
    });
    res.end();
  });
}
