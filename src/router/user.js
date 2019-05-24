const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleUserRouter = (req, res) => {
  const method = req.method
  if (req.path === '/api/user/login' && method === 'GET') {
    // const { username, password } = req.body
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(userData => {
      if (userData.username) {
        // set session
        req.session.username = userData.username
        req.session.realname = userData.realname

        return new SuccessModel(userData)
      }
      return new ErrorModel('登录失败')
    })
  }  

  // test login
  if (req.path === '/api/user/login-test' && method === 'GET') {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({
        username: req.session.username
      }))
    }
    return Promise.resolve(new ErrorModel('尚未登陆'))
  }
}

module.exports = handleUserRouter