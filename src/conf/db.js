const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if (env === 'development') {
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'pray1733',
    database: 'myblog'
  }
  REDIS_CONF = {
    host: 'localhost',
    port: '6379'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'pray1733',
    database: 'myblog'
  }
  REDIS_CONF = {
    host: 'localhost',
    port: '6379'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}