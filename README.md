# Segment Debugger App

## Getting Started

1. `git clone https://github.com/XavierAgostini/segment-debugger`
2. `cd segment-debugger`
3. `make`
4. Open you browser to localhost:5000

## Todos 

## Functionality
1. Server error logging files
2. Config script for setting up localhost port, sampling rate, and redis event stream rate
3. Stretch Goal of adding advanced filter functionality

## Refactor code
clean up code and add comments. need to clean up css files escpecially 

### Documentation
Write out documenation and include screenshots of application in different states

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
 