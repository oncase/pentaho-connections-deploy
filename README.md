# Overview

Have your connections information per environment into your projects repository and use this tool to deploy connections.

First install it globally

```bash
npm instlal -g pentaho-connections-deploy
```

Then, being on the same folder as your `config.js` file, type:

```bash
pentaho-connections-deploy --env=local
```

Or optionally pass the config file name using the argument `--config=<filepath>`

```bash
# The file connecttions.js is imported by config.js, so only
# config.js has to be provided
pentaho-connections-deploy --env=local --config=./config.js
```

For the given environment, it will:

 - Copy the necessary jdbc files into pentaho-server lib folder;
 - Copy the necessary jdbc files into data-integration lib folder;
 - Create/Update JNDI entries into the specified data-integration instalation;
 - Create/Update JDBC connections into the specified Pentaho server using its API.


# Configuration

The script relies into a configuration in the following format:

## config.js

This file contains paths, urls and available connections per environment.

There's a sample config file on `config.sample.js`.

```javascript
{
  // The path where your JDBC files are stored
  repoJDBCFolder: "../jdbc",

  // production env - naming is free - create your own
  production: {

    // pentaho-server information
    server: {
      url: 'http://localhost:8080/pentaho',
      path: '/opt/pentaho/server/pentaho-server',

      // which connections will be available
      connections: [prodCon.dw],

      // Pentaho server credentials
      auth: {
        user: 'admin',
        pass: 'password'
      }
    },

    //data-integration information
    pdi: {
      path: '/opt/pentaho/design-tools/data-integration',

      //which jndi to create/update
      connections: [prodCon.dw, prodCon.transac, prodCon.staging]
    }
  },

  // another environment - naming is free
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
```

## connections.js

This file contains connections info per environment.

There's a sample config file on `config.sample.js`.

```javascript
{
  //Connections available to the local environment
  local: {
    // dw connection - naming is free
    dw: {

      // See ./src/dbtypes
      type: 'vertica',

      // JNDI/JDBC connection name 
      JNDI: 'MY_DW',

      // database name 
      databaseName: "MY_DW",

      // database port
      port: "5433",

      // database host
      hostname: 'localhost',

      // database user
      user: 'postgres',

      // database password
      password: '123'
    },

    // Another connection - used in config.js
    staging: {
      type: 'postgres',
      JNDI: 'staging_area',
      databaseName: "staging_area",
      port: "5432",
      hostname: 'localhost',
      user: 'postgres',
      password: '123'
    },

    // Another connection - used in config.js
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

  production: {/*...*/}

}
```