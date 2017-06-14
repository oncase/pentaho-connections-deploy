module.exports = {
  postgres: {
    defaultDatabasePort: 5432,
    extraOptionsHelpUrl: 'http://jdbc.postgresql.org/documentation/83/connect.html#connection-parameters',
    name: 'PostgreSQL',
    shortName: 'POSTGRESQL',
    supportedAccessTypes: ["NATIVE", "ODBC", "JNDI"],
    driver: 'org.postgresql.Driver',
    protocol: 'jdbc:postgresql'
  },
  vertica: {
    defaultDatabasePort: 5433,
    name: "Vertica 5+",
    shortName: "VERTICA5",
    supportedAccessTypes: ["NATIVE", "ODBC", "JNDI"],
    driver: 'com.vertica.jdbc.Driver',
    protocol: 'jdbc:vertica'
  },
  mssql: {
    defaultDatabasePort: 1433,
    extraOptionsHelpUrl: "http://msdn.microsoft.com/en-us/library/ms378428.aspx",
    name: "MS SQL Server (Native)",
    shortName: "MSSQLNative",
    supportedAccessTypes: ["NATIVE", "ODBC", "JNDI"],
    driver: 'com.microsoft.sqlserver.jdbc.SQLServerDriver',
    protocol: 'jdbc:sqlserver'
  }
};