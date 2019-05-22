// get blog list
const getList = (keyword, author) => {
  return [
    {
      id:1,
      title: 'A',
      content: 'Acontent',
      createTime: 1546610491112,
      author: 'zhangsan'
    },
    {
      id:2,
      title: 'B',
      content: 'Bcontent',
      createTime: 1546610491112,
      author: 'lisi'
    }
  ]
}

// get blog detail
const getDetail = id => {
  return {
    id:1,
    title: 'A',
    content: 'Acontent',
    createTime: 1546610491112,
    author: 'zhangsan'
  }
}

// add new blog
const newBlog = (blogData={}) => {
  return {
    id:3
  }
}

// update blog
const updateBlog = (id, blogData={}) => {
  return true
}

// delete blog
const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}