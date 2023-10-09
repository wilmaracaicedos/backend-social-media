require('dotenv').config();

module.exports = {
  api: {
    port: process.env.NODE_DOCKER_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecret!',
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001,
  }
}
