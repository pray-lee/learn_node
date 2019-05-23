const env = process.env.NODE_ENV

let MYSQL_CONF

if (env === 'development') {
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'pray1733',
    database: 'myblog'
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
}

module.exports = {
  MYSQL_CONF
}