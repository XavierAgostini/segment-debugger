# Segment Debugger App

## Getting Started

1. `git clone https://github.com/XavierAgostini/segment-debugger`
2. `cd segment-debugger`
3. `make test`
4. `make`
5. Open your browser to [localhost:5000](http://localhost:5000)

![image](https://user-images.githubusercontent.com/7476817/45731723-caae3f00-bb8d-11e8-86b3-060c45737dae.png)

## Architecture

This implmentation of the Segment Debugger was created using React.js front-end app being served events from an Express.js API. The Express API makes a connection to the Redis subscription channel when a client makes a GET request  to a specific route (GET /debugger-stream). It will then forward those messages to the client using server-side-events (SSE), which is persistant HTTP connection to a client. Server-side-events are required to be sent in a specific format to be recognized by the client. The following message is written to the HTTP response object on every event sent: `data: My message\n\n`. The Browser client can use the [Event Source](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) interface to read the events. It achieves this by keeping a persistant HTTP connection to the server, allowing the server to send a stream of events in a 'text/event-stream' format. 

## Functionality

- *Pause/Live:* Pressing the pause button will result in new events being added to the debugger. Once the 'live' button is pressed, events will resume appearing in the debugger.

- *Code views:* The user can toggle between the pretty and raw event views. The pretty view shows what the event looks like if it was sent via the original event library. Currently the pretty view will only show the event formatted as it would be if it was sent via analytics.js. I also did not add syntax highlighting that is normally seen in the actual Segment debugger.

![image](https://user-images.githubusercontent.com/7476817/45732411-01d21f80-bb91-11e8-8076-2437f574ef8e.png)

The raw view shows the full JSON event payload:
![image](https://user-images.githubusercontent.com/7476817/45732411-01d21f80-bb91-11e8-8076-2437f574ef8e.png)


- *Filter:*  The search box will filter events based on the full event payload. When the text is removed the full list of events is rerendered to the screen. With more time I would add the 'Advanced' filter functionality.
![image](https://user-images.githubusercontent.com/7476817/45732442-2cbc7380-bb91-11e8-9fd8-70534dd98d08.png)

## Performance Considerations

To ensure that this application can run on any computer I used the provided Redis and Stream containers in additional to a Node container to run the express server. As the Stream Docker container is writing events as 100 events/s, this large amount of events will cause performance issues in the debugger. Specifically customers would be unable to use the debugger as events would be rendered too quickly to even be seen. A large amount of events being rendered will also slow down the browser and potentially freeze the web page. To ensure optimized performance, a max of 5 events/s are sampled and sent to the debugger. To ensure that a large number of rendered events do not overwhelm the browser's memory; the number of displayed events is capped at 500 events. Once the cap is reached older events will be removed from the array.

## Error Handling

The front-end debugger app is able to handle errors related to both the Redis and Express server errors. If Redis goes down, the server will maintain the connection to the client and write an error message to the event stream, notifying the client that the service is unavailable. The app will send an alert message to the user notifying them that the server is temporarily down. This is to prevent confusion for when customers are using the debugger and notice no events are arriving. Once the Redis server reconnects, the event stream will resume, and activity on the debugger will resume as well, with an alert being sent to the user to notify them that service has resumes. 


![image](https://user-images.githubusercontent.com/7476817/45731940-df3f0700-bb8e-11e8-8a5d-e68e08c9a26b.png)

If the Express server goes down the event-stream is broken, and the eventstream object on the client will throw an error. The react app listens for these errors and throws a warning message to the user notifying them that the server is down. The object will try to reconnect automatically to the service. Once the server becomes available again, the client will automatically reconnect to the server, and event stream. Service will then resume on the debugger and a notication will be alerted to the user to notify them service has resume. 

![image](https://user-images.githubusercontent.com/7476817/45732056-72783c80-bb8f-11e8-83ce-6bd956497659.png)

## Testing Suite

I used Jest to unit test the React app. Each component has its own test file where tests are run to ensure that the components render as expected. Additional tests are also run to test functionality such as button clicks. The Express API is also unit tested to ensure that the expected content is served as well that the sampling rate is not exceeeded.

## Ideal Production State

As the Redis event stream is serving events at a constant rate, the debugger does not emulate real life behavior. In real life depending on the Segment source, events can arrive in various quantities over time. Having a strict sampling rate of 5 events/s is not ideal in all cases as low-volume sources could potentially miss out on a series of events that are sent in a short duration. Ideally a sampling rate should be used when a large number of events/s are being sent consistently to Segment. Events should be buffered to ensure if a spike does occurr events can be sent to the debugger at a later time. A cache of events should also be kept for when the debugger loads, so the debugger does not appear empty on load. This could create customer confusion, as they might think Segment lost their events or that the older events never arrived.
