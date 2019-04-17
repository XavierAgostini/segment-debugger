// import path from 'path'
const express = require('express')
const redis = require('redis')
const path = require('path')
var cors = require('cors')

const port = process.env.PORT || 5000
const publicPath = path.join(__dirname, '../public');
const env = process.env.NODE_ENV || 'development'
const app = express()

const counters = require('./counters')

// serve static content to client
app.use(express.static(publicPath));
app.use(cors())

app.get('/t', (req, res) => {
  res.sendStatus(200)
})


app.get('/counter/:event_name/:date_start/:date_end', (req, res) => {
  // logic to validate paramaters
  let event_name = req.params.event_name
  let date_start = req.params.date_start
  let date_end = req.params.date_end

  var count

  try {
    console.log(counters[event_name][date_end], counters[event_name][date_start])
    console.log(counters[event_name])
    console.log(counters)
    if (counters[event_name][date_start]) {
      count = counters[event_name][date_end] - counters[event_name][date_start]
    } else {
      count = counters[event_name][date_end]
    }
  } catch (e) {
    count = 0
  }
  // res.json(counters)
  res.json({event_name, date_start, date_end, count})
})

app.get('/debugger-stream', (req, res) => {
  try {
    // need to alter Redis server url for running in a docker container
    let redisUrl = ''
    if (env !== 'development') {
      redisUrl = '//redis:6379'
    }
    // create new subscription to redis server for each client that connects to server
    const subscriber = redis.createClient(redisUrl)
    
    subscriber.subscribe('events')
    var messageCount = 0

    // When connection to Redis goes down write error to event stream to notify client of issue
    subscriber.on('error', (err) => {
      console.log(`redis err: ${err}`)
      res.write(`data: server-error\n\n`)
    })
   
    // Send Sever Side Events (SSE) to connected client, by persisting the connection and writting new events to the response
    // To increase performance add in event sampling to ensure we don't overwelm the client application
    // Allow max 5 events per second
    var count = 0
    setInterval(()=> {
      count = 0
    }, 1000)
    // the eventsource response type requires events by sent in the following format: id, type, data. Each needs to be on a new line
    subscriber.on('message', (channel, message) => {
      
      if (count < 5) {
        res.write(`id: ${messageCount}\n`)
        res.write('type: ${channel}\n')
        res.write(`data: ${message}\n\n`)
        count++
      }
    })
    
    // Set response headers to confifgure the event-steam
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      // These two headers are for development purposes as webpack dev server runs on a differnt port
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    })
    res.write('\n')
    
    // When client closes webpage, terminate Redis connection
    req.on("close", function() {
      subscriber.unsubscribe();
      subscriber.quit();
    });
  } catch (e) {
    res.sendStatus(404).send(e)
  }
})

app.listen(port, (err) => {
  if (err) throw err
  console.log(`Server started on port ${port}`)
})

module.exports = app 