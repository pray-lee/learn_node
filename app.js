const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// cookie expires
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

// session data
const SESSION_DATA = {}

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

  // set req.cookie
  const cookieStr = req.headers.cookie || ''
  req.cookie = {}
  cookieStr.split(';').forEach(item => {
    const cookieArr = item.split('=')
    const key = cookieArr[0]
    const value = cookieArr[1]
    req.cookie[key] = value
  })

  // set req.session
  let needSetCookie = false
  let userId = req.cookie.userid
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

  // get post data
  getPostData(req)
    .then(postData => {
      req.body = postData

      // if post data or not, we should put these logic into the callback

      // blog router
      const blogResult = handleBlogRouter(req, res)
      if (blogResult) {
        blogResult.then(blogData => {
          if (needSetCookie) {
            // if login success, then set cookie to browser.
            res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
          }
          res.end(JSON.stringify(blogData))
        })
        return
      }

      // user router
      const userResult = handleUserRouter(req, res)
      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
          }
          res.end(JSON.stringify(userData))
        })
        return
      }

      // 404
      res.writeHead(404, {"Content-Type": "text/plain"})
      res.end('404 Not Found!')
    }) 
}

module.exports = serverHandle