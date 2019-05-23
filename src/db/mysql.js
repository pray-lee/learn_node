const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// create connection
const con = mysql.createConnection(MYSQL_CONF)

// connect
con.connect()

// common excute func, any sql statement will use this method to get the results
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec
}
// 这里不用关闭数据库连接, 当做单利使用，只在引入这个文件的时候执行一次。 因为import 本身就是单利模式实现的