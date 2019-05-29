const { REDIS_CONF } = require('../conf/db')
const redis = require('redis')

// create connection
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

// watch error
redisClient.on('error', err => {
  console.log('Error', err)
})

module.exports = redisClient