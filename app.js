const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// get post data func
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    // if not post , return empty object
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk 
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = (req, res) => {
  // 设置返回格式json
  res.setHeader('Content-Type', 'application/json')
  req.path = req.url.split('?')[0]

  // get query
  req.query = querystring.parse(req.url.split('?')[1])

  // get post data
  getPostData(req)
    .then(postData => {
      req.body = postData

      // if post data or not, we should put these logic into the resolve

      // blog router
      const blogData = handleBlogRouter(req, res)
      if (blogData) {
        res.end(JSON.stringify(blogData))
        return
      }

      // user router
      const userData = handleUserRouter(req, res)
      if (userData) {
        res.end(JSON.stringify(userData))
        return
      }
      // 404
      res.writeHead(404, {"Content-Type": "text/plain"})
      res.end('404 Not Found!')
    }) 
}

module.exports = serverHandle