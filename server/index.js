const path = require('path')
const express = require('express')
const redis = require('redis')

const port = process.env.PORT || 5000
const publicPath = path.join(__dirname, '../public');

const app = express()
const client = redis.createClient()

app.use(express.static(publicPath));


app.get('/debugger-stream', (req, res) => {
  try {
    // let request last as long as possible
    // req.socket.setTimeout(Infinity);
    const subscriber = redis.createClient()
    subscriber.subscribe('events')
    var messageCount = 0
    subscriber.on('error', (err) => {
      console.log(`redis err: ${err}`)
    })
    // might want to add some sampling rate to this
    subscriber.on('message', (channel, message) => {
      messageCount++
      res.write(`id: ${messageCount}\n`)
      res.write('type: ${channel}\n')
      res.write(`data: ${message}\n\n`)
    })

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
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

app.get('/debugger-stream-test', (req, res) => {
  // let request last as long as possible
  // req.socket.setTimeout(Infinity);
  var id = 0

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
  res.write('\n')
  setInterval(()=> {
    id++
    res.write(`id: ${id}\n`)
    res.write('type: test\n')
    res.write(`data: message-${id}\n`)
    res.write('\n')
  }, 2000)
})

app.listen(port, (err) => {
  if (err) throw err
  console.log(`Server started on port ${port}`)
})