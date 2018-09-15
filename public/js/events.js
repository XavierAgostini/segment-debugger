var source = new EventSource('/debugger-stream')
source.addEventListener('message', function(e) {
  console.log(e)
})
