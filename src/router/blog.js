const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  // new blog
  if (req.path === '/api/blog/new' && method === 'POST') {
    const blogData = req.body
    const result = newBlog(blogData)
    return new SuccessModel(result)
  }
  // update blog
  if (req.path === '/api/blog/update' && method === 'POST') {
    const updateBlogData = req.body 
    const result = updateBlog(id, updateBlogData) 
    if (result) {
      return new SuccessModel()
    }
    return ErrorModel('更新博客失败')
  }
  // get blog list
  if (req.path === '/api/blog/list' && method === 'GET') {
    const keyword = req.query.keyword
    const author = req.query.author
    const result = getList(keyword, author)
    return new SuccessModel(result)
  }
  // get blog detail
  if (req.path === '/api/blog/detail' && method === 'GET') {
    const result = getDetail(id)
    return new SuccessModel(result)
  }
  // del blog
  if (req.path === '/api/blog/del' && method === 'POST') {
    const result = delBlog(id)
    if (result) {
      return new SuccessModel(result)
    }
    return ErrorModel('删除博客失败')
  }
}

module.exports = handleBlogRouter