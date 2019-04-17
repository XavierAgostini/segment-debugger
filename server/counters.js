const redis = require('redis')

// in memory counter
var timestamp_counters = {}
var event_counters = {}

// current hour
var timestamp = new Date().toISOString().substring(0,13)

console.log('here')

try {
  // need to alter Redis server url for running in a docker container
  let redisUrl = ''
  // if (env !== 'development') {
  //   redisUrl = '//redis:6379'
  // }

  // create new subscription to redis server for each client that connects to server
  const subscriber = redis.createClient(redisUrl)
      
  subscriber.subscribe('events')

  subscriber.on('error', (err) => {
    console.log(`redis err: ${err}`)
    res.write(`data: server-error\n\n`)
  })

  subscriber.on('message', (channel, message) => {
    // console.log(message)
    let event = JSON.parse(message)
    // console.log(event)
    if (event.type !== 'track') return

    if (!timestamp_counters[event.event]) {
      timestamp_counters[event.event] = {}
    }
    if (!event_counters[event.event]) {
      event_counters[event.event] = 0
    }

    event_counters[event.event] += 1
    timestamp_counters[event.event][timestamp] = event_counters[event.event]
    // console.log(timestamp_counters)
  })

} catch (e) {
  console.log(e)
}

module.exports = timestamp_counters