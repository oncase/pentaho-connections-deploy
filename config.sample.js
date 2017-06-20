/* -----------------------------------------------------------------------------
 *  CONFIG-ME 
 * -----------------------------------------------------------------------------
 *  Paths and available connections on each container
 * -------------------------------------------------------------------------- */

var conn = require("./connections");

var prodCon = conn.production;
var localCon = conn.local;

module.exports = {
  repoJDBCFolder: "../jdbc",
  production: {
    server: {
      url: 'http://localhost:8080/pentaho',
      path: '/opt/pentaho/server/pentaho-server',
      connections: [prodCon.dw],
      auth: {
        user: 'admin',
        pass: 'password'
      }
    },
    pdi: {
      path: '/opt/pentaho/design-tools/data-integration',
      connections: [prodCon.dw, prodCon.transac, prodCon.staging]
    }
  },
  local: {
    server: {
      url: 'http://localhost:8080/pentaho',
      path: '/opt/the7/server/pentaho-server',
      connections: [localCon.dw],
      auth: {
        user: 'admin',
        pass: 'password'
      }
    },
    pdi: {
      path: '/opt/the7/design-tools/data-integration',
      connections: [localCon.dw, localCon.transac, localCon.staging]
    }
  }
}