# Segment Debugger App

## Getting Started

1. `git clone https://github.com/XavierAgostini/segment-debugger`
2. `cd segment-debugger`
3. `make test`
4. `make`
5. Open your browser to localhost:5000

## Architecture

The debugger was created using React. It's served from a Express app, and the events are delivered via an event stream. The event stream is a p. The server sends server-side-events (SSE) to the client by maintaining a persitant connection. The Browser can use the [Event Source](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) interface. This can keep a persistant HTTP connection to a server allowing the server to send a stream of events in a 'text/event-stream' format. 

Docker Architecture

I used the provided Redis and Stream containers in additional to a node container to run the express server. The server makes a subscription connection to the Redis event stream when a client makes a GET request (GET /debugger-stream) to a certain route. It will then send those messages to the client using server-side-events. Server-side-events are required to be sent in a specific format to be recognized by the client. (TODO elab on format). If redis goes down, the server will maintain the connection to the client and write an error message, notifying the client that the service is unavailable at the moment. Once the Redis server reconnects, the event stream will resume, and acticity on the debugger will resume as well. If the server goes down the event-stream is broken, and the eventstream object on the client will throw an error. The react app listens for these errors and throws a warning message to the user notifying them that the server is down. The object will try to reconnect automatically to the service. Once the server becomes available again, the client will automatically reconnect to the server, and event stream. Service will then resume on the debugger. As the stream docker container is writing events as 100 events/s, this large amount of events will cause performance issues in the debugger. To get around this a max of 5 events/s are sampled and sent to the debugger. To ensure that a large number of caches events doesn't overwhelm the browsers memory a capp to the number of events is places at 500 (need to confirm). Once the cap is reached older events will be removed from the array.

## Testing Suite

I used Jest to unit test the React app. Each component has its own test file where tests are run to ensure that the components render as expected. Additional tests are also run to test functionality such as button clicks.

## Ideal Production State
As the Redis event stream is serving events at a constant rate, the debugger does not emulate real life behavior. In real life depending on the customer and Segment source, events can arrive in various quantities over time. As such having a strict sampling rate of 5 events/s is not ideal. Ideally it should use a sampling rate when a large number of events/s are being sent to Segment. A cache of events should be kept for when the debugger loads, so the debugger does not appear empty on load. This could create customer confusion, as they might think Segment lost their events or that they never arrived.

### Test Suite

1. Test rendering each component
2. Test functionality
  a. live
  b. pause
  c. filter
  d. pretty view
  e. raw view
  f. server disconnect ui
  g. redis server disconnect ui
  h. server
    i. test serving static content
    ii. test creating event-stream
    iii. test disconnecting from redis
 
