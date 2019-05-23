const mysql = require('mysql')

// create connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'pray1733',
  database: 'myblog'
})

//connect
connection.connect()

// excute sql 
const sql = `insert into blogs (title, author, createtime, content) values ('标题c', 'lisi', '1558595610467', '内容c')` 
connection.query(sql, (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('--------------\b', result)
})

// close connect
connection.end()
