const { REDIS_CONF } = require('../conf/db')
const redis = require('redis')

// create connection
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

// watch error
redisClient.on('error', err => {
  console.log('Error', err)
})

function set(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value, redis.print) 
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        console.log('Error', err)
        reject(err)
        return
      }
      if (value == null) { // 如果没有这个key值，redis默认返回 null
        resolve(null)
        return 
      }
      try {
        resolve(JSON.parse(value))
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}