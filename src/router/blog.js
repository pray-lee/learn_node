const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// checklogin
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登陆'))
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  // new blog
  if (req.path === '/api/blog/new' && method === 'GET') {
    // check login
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    req.body.author = req.session.username
    const blogData = req.body
    const result = newBlog(blogData)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // update blog
  if (req.path === '/api/blog/update' && method === 'POST') {
    // check login
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

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
    // check login
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    const author = req.session.username
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