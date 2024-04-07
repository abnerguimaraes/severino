'use strict';

module.exports = Database;

function Database(paramObj) {
  this.VERSION = '2023-12-04';

  const env = paramObj.env || 'local';

  const Sequelize = require('sequelize');

  const sequelize = new Sequelize(process.env.BEARDB, process.env.BEARUSER, process.env.BEARPASS, {
    host: process.env.BEARHOST,
    dialect: 'postgres',
    timezone: 'America/Sao_Paulo',
    logging: (query, options) => {
      console.log('Query:', query);
      options.bind && console.log('Parameters:', options.bind);
    },
  });

  return sequelize;
}
