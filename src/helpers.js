const fs = require('fs-extra');
const types = require('./dbtypes');

module.exports = {

  /**
   * Gets the PUT request body to create/update a connection
   * using Pentaho's JDBC endpoint
   */
  getConnectionBody : function( conn ){
    return {
      "changed": true,
      "SQLServerInstance": conn.SQLServerInstance,
      "usingConnectionPool": true,
      "connectSql": "",
      "dataTablespace": "",
      "databaseName": conn.databaseName,
      "databasePort": conn.port,
      "hostname": conn.hostname,
      "name": conn.JNDI,
      "password": conn.password,
      "username": conn.user,
      "attributes": {
        "PORT_NUMBER": conn.port
      },
      "connectionPoolingProperties": {},
      "extraOptions": {},
      "accessType": "NATIVE",
      "databaseType": types[conn.type]
    }
  },

  /**
   * Gets JNDI text to append to a .properties java file
   */
  getConnectionProperties : function( conn ){

    // MSSQL being the different 
    var inst = conn.SQLServerInstance ? '\\'+ conn.SQLServerInstance : '';
    var dbSep = inst === '' ? '/'  : ';databaseName=' ;

    return '\n\n# Added by pentaho-connections-deploy'+
        '\n' + conn.JNDI +'/type=javax.sql.DataSource' + 
        '\n' + conn.JNDI +'/driver=' + types[conn.type].driver + 
        '\n' + conn.JNDI +'/user=' + conn.user + 
        '\n' + conn.JNDI +'/password=' + conn.password + 
        '\n' + conn.JNDI +'/url=' + types[conn.type].protocol + '://' + conn.hostname + inst + ':' + conn.port + dbSep + conn.databaseName;
  },

  copyFilesTo(files, to){
    fs.copySync(files, to);
  }
};