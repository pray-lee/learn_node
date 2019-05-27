const redis = require('redis')

// create connection
const redisClient = redis.createClient(6379, 'localhost')

// watch error
redisClient.on('error', err => {
  console.error('Error ' + err)
})

// test code...
redisClient.set('username', 'leexiaoyong', redis.print)
redisClient.get('username', (err, value) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('value is ', value)

  // close connection
  redisClient.quit()
})

