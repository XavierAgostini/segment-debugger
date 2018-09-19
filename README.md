# Segment Debugger App

## Getting Started

1. `git clone https://github.com/XavierAgostini/segment-debugger`
2. `cd segment-debugger`
3. `make`
4. Open your browser to [localhost:5000](http://localhost:5000)

![image](https://user-images.githubusercontent.com/7476817/45786389-1bbd4200-bc25-11e8-83a8-200ddee8c6d6.png)

## Architecture

This implementation of the Segment Debugger was created using a React.js front-end app being served events from an Express.js API. The Express API makes a connection to a Redis subscription channel when a client makes a GET request to a specific route (GET /debugger-stream). The server will then forward those messages the client by maintaining a persistant HTTP connection and sending server-side-events (SSE) to the client. Server-side-events are required to be sent in a specific format to be recognized by the client. The following message is written to the HTTP response object on every event sent: `data: <event_string>\n\n`. A Browser client can use the [Event Source](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) interface to connect to the Server and read the events. It achieves this by keeping a persistant HTTP connection to the server, allowing the server to send a stream of events in a 'text/event-stream' format. 

## Debugger Functionality

- *Pause/Live:* Pressing the 'Pause' button will result in no new events being added to the debugger event list. Once the 'Live' button is pressed, events will resume appearing in the debugger.

- *Code Views:* The user can toggle between the 'pretty' and 'raw' event views. The pretty view shows what the event looks like if it was sent via the originating Segment library. Currently the pretty view will only show the event formatted as it would be if it was sent via analytics.js.

![image](https://user-images.githubusercontent.com/7476817/45786437-4909f000-bc25-11e8-97a2-533b4b35aaa4.png)

The raw view shows the full JSON event payload:
![image](https://user-images.githubusercontent.com/7476817/45786303-b9644180-bc24-11e8-950c-9072a6d91a37.png)

- *Filter:*  The search box will filter events based on the full event payload. Events will be dynamically filtered based on what is being typed. When the text is removed the full list of events is rerendered to the screen. With more time I would add the 'Advanced' filter functionality.
![image](https://user-images.githubusercontent.com/7476817/45786342-e4e72c00-bc24-11e8-8491-6fe98c8576bb.png)

## Performance Considerations

To ensure that this application can run on any computer I used the provided Redis and Stream containers in additional to a Node container to run the Express server on. As the Stream Docker container is writing events at 100 events/s, this large amount of events will cause performance issues in the debugger. Specifically users would be unable to use the debugger in a meaningful way as events would be rendered too quickly to even be seen. A large amount of events being rendered will also slow down the browser and potentially freeze the web page. To ensure optimized performance, a max of 5 events/s are sampled and sent to the debugger. To ensure that a large number of rendered events do not overwhelm the browser; the number of displayed events is capped at 500 events. Once the cap is reached older events will be removed from the array.

## Error Handling

The front-end debugger app is able to handle errors related to both the Redis and Express server errors. If Redis goes down, the server will maintain the connection to the client and write an error message to the event stream, notifying the client that the service is unavailable. The app will send an alert message to the user notifying them that the server is temporarily down. This is to prevent confusion for when customers are using the debugger and notice no events are arriving. Once the Redis server reconnects, the event stream will resume, and activity on the debugger will resume as well, with an alert being sent to the user to notify them that service has resumed. 


![image](https://user-images.githubusercontent.com/7476817/45731940-df3f0700-bb8e-11e8-8a5d-e68e08c9a26b.png)

If the Express server goes down the event-stream will close, and the eventstream object on the client will throw an error. The React app listens for these errors and throws a warning message to the user notifying them that the server is down. Once the server becomes available again, the client will automatically reconnect to the server, and event-stream. Service will then resume in the debugger and a notication will be alerted to the user to notify them service has resumed. 

![image](https://user-images.githubusercontent.com/7476817/45732056-72783c80-bb8f-11e8-83ce-6bd956497659.png)

## Testing Suite

To run the test suite:

- `make test`

I used Jest to unit test the React app. Each component has its own test file where tests are run to ensure that the components render as expected. Additional tests are also run to test functionality such as button clicks. The Express API is also unit tested to ensure that the expected content is served as well that the sampling rate is not exceeeded.

## Ideal Production State

As the Redis event stream is serving events at a constant rate, the debugger does not emulate real world behavior. Depending on the Segment source, events can arrive at various rates over time. Having a strict sampling rate of 5 events/s is not ideal in all cases as low-volume sources could potentially miss out on a series of events that are sent in a short duration. Ideally a sampling rate should be used when a large number of events/s are being sent consistently to Segment. This would ensure users can still use the debugger for high-volume sources. Events should be buffered to ensure if a spike does occurr events can be sent to the debugger at a later time. A server-side cache of events should also be kept for when the debugger loads, so the debugger does not appear empty on load. This could create customer confusion, as they might think Segment lost their events or that the older events never arrived.

## Time Spent
- Express API - 2 hours
- React App - 15 hours
- Unit Testing - 5 hours (had to take time to learn how to unit test React apps using Jest)
- Documentation - 1 hour
- Total: 23 hours
