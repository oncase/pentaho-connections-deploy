module.exports = function( env, config ){

  const request = require('request');
  const helpers = require('./helpers');
  const fs = require('fs');

  const cfg = config[env];
  const JDBC_FOLDER = config.repoJDBCFolder + '/';

  if(!cfg){
    console.log("No config found. CONFIG:\n", config,"\n\nENV:\n", env);
    process.exit(2);
  }

  console.log("---------------------------");
  console.log("Envitonment: ", env);
  console.log("---------------------------\n");
  /* -----------------------------------------------------------------------------
  *  JNDI entries 
  * -------------------------------------------------------------------------- */
  const pdi = cfg.pdi;
  const pdiLibPath = pdi.path + '/lib/';
  const JNDI_FILE = pdi.path + '/simple-jndi/jdbc.properties';
  const connNames = pdi.connections.map( function(c){return c.JNDI;} );

  // JDBC Drivers copy 
  // -----------------------------------------------------
  helpers.copyFilesTo(JDBC_FOLDER, pdiLibPath);
  console.log("JDBC drivers copied to '" + pdiLibPath + "'")

  // Deletes prepvious occurrences 
  // -----------------------------------------------------
  var lines = [];
  var lineReader = require('readline').createInterface({
    input: fs.createReadStream(JNDI_FILE)
  });

  lineReader.on('line', function (line) {
    const connName = line.includes("/") 
                      ? line.trim().substring(0, line.trim().indexOf('/')) 
                      : "" ;
    const connectionToKeep = !connNames.includes(connName) 
                            || line.includes("pentaho-connections-deploy");
    if(connectionToKeep) lines.push(line);
  });

  lineReader.on('close', function(){

    // Updates properties file with environment connections
    // -----------------------------------------------------
    var linesStr = lines.join('\n');

    pdi.connections.forEach(function (conn){
      linesStr += helpers.getConnectionProperties( conn );
    });

    fs.writeFile(JNDI_FILE, linesStr, function(err) {
        if(err)  return console.log(err);
        console.log("[PDI JNDI] Saved successfully", JNDI_FILE);
    }); 
  })

  /* -----------------------------------------------------------------------------
  *  SERVER CONNECTIONS 
  * -------------------------------------------------------------------------- */
  const server = cfg.server;
  const serverLibPath = server.path + '/tomcat/lib/';

  // JDBC Drivers copy 
  // -----------------------------------------------------
  helpers.copyFilesTo(JDBC_FOLDER, serverLibPath);
  console.log("JDBC drivers copied to '" + serverLibPath + "'")

  server.connections.forEach(function (conn) {

    console.log("[Server connection] Trying to put:  ", conn.JNDI);

    request({
      method: 'PUT',
      uri: cfg.server.url + '/plugin/data-access/api/datasource/jdbc/connection/'+conn.JNDI,
      body: JSON.stringify( helpers.getConnectionBody( conn ) ),
      auth: server.auth
    },
      function (error, response, body) {
        if(response === undefined){
          console.log('[Server connection] Server not available',conn.JNDI,"\n\n");
          return;
        }

        if (response.statusCode == 201 || response.statusCode == 200) {
          console.log('[Server connection] Connection saved',conn.JNDI,"\n\n");
        } else {
          console.log('[Server connection] ERROR SAVING',conn.JNDI,"\n\n");
        }
      });
  });

}