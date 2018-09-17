const path = require('path')
const express = require('express')
const redis = require('redis')

const port = process.env.PORT || 5000
const publicPath = path.join(__dirname, '../public');
const env = process.env.NODE_ENV || 'development'
const app = express()


app.use(express.static(publicPath));

app.get('/debugger-stream', (req, res) => {
  try {
    // need to alter Redis server url for running in a docker container
    let redisUrl = ''
    if (env !== 'development') {
      redisUrl = '//redis:6379'
    }
    const subscriber = redis.createClient(redisUrl)
    const now = new Date().getTime()
    const keyName = `test-${now}`

    subscriber.subscribe('events')
    var messageCount = 0
    subscriber.on('error', (err) => {
      console.log(`redis err: ${err}`)
    })

    var count = 0
    setInterval(()=> {
      count = 0
    }, 1000)
    // might want to add some sampling rate to this
    subscriber.on('message', (channel, message) => {
      if (count < 5) {
        res.write(`id: ${messageCount}\n`)
        res.write('type: ${channel}\n')
        res.write(`data: ${message}\n\n`)
        count++
      }
    })

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      // These two are for development purposes as webpack dev server runs on a differnt port
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    })
    res.write('\n')

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