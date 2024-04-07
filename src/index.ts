"use strict";

const util = require("util");
const fs = require("fs");
const path = require("path");
const env = process.env.NODE_AMBIENTE;
const pid = require("process");
const cors = require("cors");
const express = require("express");
require("dotenv").config();
process.env.TZ = "America/Sao_Paulo";

try {
  const paramObj: any = new Object();

  paramObj.util = util;
  paramObj.fs = fs;
  paramObj.path = path;
  paramObj.express = express;

  const conf = "./conf/conf.json";
  const logFile = JSON.parse(fs.readFileSync(conf)).general.log.logPath;

  paramObj.conf = JSON.parse(fs.readFileSync(conf)).general;
  paramObj.logFile = logFile;
  paramObj.env = env;

  const Logger = require("./logger/index");
  const logger = new Logger("INFO", paramObj);

  paramObj.logger = logger;

  logger.info(
    `Severino Builder - Initializing logger module under process ${pid.pid} and ${env} as environment.`
  );

  const Database = require("./helpers/database");
  const database = new Database(paramObj);
  paramObj.database = database;

  const DinamicRoutes = require("./routes/DynamicRoutes");
  const dinamicRoutes = new DinamicRoutes(paramObj);

  const StaticRoutes = require("./routes/StaticRoutes");
  const staticRoutes = new StaticRoutes(paramObj);

  const QueryParam = require("./routes/QueryParamRoutes");
  const queryParam = new QueryParam(paramObj);

  const QueryBuilder = require("./routes/QueryBuilderRoutes");
  const queryBuilder = new QueryBuilder(paramObj);

  const corsOptions = {
    origin: ["http://localhost:3000", "https://d10sh56pxqijnv.cloudfront.net"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };

  const app = express();
  app.use(cors(corsOptions));
  app.use(express.json());

  app.use(staticRoutes.router);
  app.use("/api", dinamicRoutes.router);
  app.use("/api/query_param", queryParam.router);
  app.use("/api/query_builder", queryBuilder.router);

  logger.info(
    `Severino is about to up the server on port ${paramObj.conf.port}`
  );
  app.listen(paramObj.conf.port);
} catch (error) {
  console.error("Error: ", error);
}
