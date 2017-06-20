/* -----------------------------------------------------------------------------
 *  CONFIG-ME 
 * -----------------------------------------------------------------------------
 *  Connections per environment
 * -------------------------------------------------------------------------- */

var dbtypes = require(__dirname+"/src/dbtypes");

module.exports = {

  /* ***************************************************************************
   *  LOCAL - Keep here all your local connection info
   * ************************************************************************ */
  local: {
    dw: {
      type: 'vertica',
      JNDI: 'MY_DW',
      databaseName: "MY_DW",
      port: "5433",
      hostname: 'localhost',
      user: 'postgres',
      password: '123'
    },
    staging: {
      type: 'postgres',
      JNDI: 'staging_area',
      databaseName: "staging_area",
      port: "5432",
      hostname: 'localhost',
      user: 'postgres',
      password: '123'
    },
    transac: {
      type: 'mssql',
      JNDI: 'TRANSAC',
      SQLServerInstance: 'InstanceName',
      databaseName: "dbName",
      port: "1433",
      hostname: '192.168.1.1',
      user: 'sa',
      password: '123'
    }
  },

  /* ***************************************************************************
   *  PRODUCTION - Keep here all the production info
   * ************************************************************************ */
  production: {
    dw: {
      type: 'vertica',
      JNDI: 'MY_DW',
      databaseName: "MY_DW",
      port: "5433",
      hostname: 'localhost',
      user: 'postgres',
      password: '123'
    },
    staging: {
      type: 'postgres',
      JNDI: 'staging_area',
      databaseName: "staging_area",
      port: "5432",
      hostname: 'localhost',
      user: 'postgres',
      password: '123'
    },
    transac: {
      type: 'mssql',
      JNDI: 'TRANSAC',
      SQLServerInstance: 'InstanceName',
      databaseName: "dbName",
      port: "1433",
      hostname: '192.168.1.1',
      user: 'sa',
      password: '123'
    }
  }

};