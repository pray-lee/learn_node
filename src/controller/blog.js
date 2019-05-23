const { exec } = require('../db/mysql')
// get blog list
const getList = (keyword, author) => {
  let sql = `select * from blogs where 1=1 `
  if (keyword) {
    sql += `and title like'%${keyword}%' `
  }
  if (author) {
    sql += `and author='${author}' `
  }
  sql += `order by createtime desc`
  return exec(sql)
}

// get blog detail
const getDetail = id => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

// add new blog
const newBlog = (blogData={}) => {
  const title = blogData.title
  const content = blogData.content
  const createTime = Date.now()
  const author = 'zhangsan'
  
  const sql = `
      insert into blogs (title, content, createtime, author)
      values ('${title}', '${content}', '${createTime}', '${author}')
  `
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

// update blog
const updateBlog = (id, blogData={}) => {
  const title = blogData.title
  const content = blogData.content
  const sql = `update blogs set title='${title}', content='${content}' where id='${id}'`
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

// delete blog
const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then(deleteData => {
    if(deleteData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}