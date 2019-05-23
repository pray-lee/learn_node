const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  // new blog
  if (req.path === '/api/blog/new' && method === 'POST') {
    const blogData = req.body
    const result = newBlog(blogData)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // update blog
  if (req.path === '/api/blog/update' && method === 'POST') {
    const updateBlogData = req.body 
    const result = updateBlog(id, updateBlogData) 
    return result.then(isUpdated => {
      if (isUpdated) {
        return new SuccessModel()
      }
      return new ErrorModel('更新博客失败')
    })
  }
  // get blog list
  if (req.path === '/api/blog/list' && method === 'GET') {
    const keyword = req.query.keyword
    const author = req.query.author
    const result = getList(keyword, author)
    return result.then(listData => {
      return new SuccessModel(listData)
    }) 
  }
  // get blog detail
  if (req.path === '/api/blog/detail' && method === 'GET') {
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // del blog
  if (req.path === '/api/blog/del' && method === 'GET') {
    const author = 'lisi' // 假数据
    const result = delBlog(id, author)
    return result.then(isDeleted => {
      if (isDeleted) {
        return new SuccessModel()
      }
      return new ErrorModel('删除博客失败')
    })
  }
}

module.exports = handleBlogRouter