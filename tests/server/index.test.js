const EventSource = require('eventsource')
// const { exec } = require('child_process');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

let eventSource, messageCount, event, start
// eventSource = new EventSource('http://localhost:5002/debugger-stream')
beforeEach(() => {
  event = null
  start = false
  messageCount = 0
  eventSource = new EventSource('http://localhost:5000/debugger-stream')
})
afterEach(() => {
  eventSource.close()
})

describe('GET /debugger-stream', () => {
  test('should get 5 events per second', (done) => {
    eventSource.addEventListener('message', (event) => {
      event = JSON.parse(event.data)
      expect(event.type).toMatch(new RegExp('page|track|identify|group|alias|screen'))
      messageCount++
    })
    if(!start) {
      setTimeout(()=> {
        expect(messageCount).toEqual(5)
        done()
      }, 1000)
    }
  })
})