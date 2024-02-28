// FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
// (node:57957) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 
// 11 data listeners added to [EventEmitter]. 
// Use emitter.setMaxListeners() to increase limit

import { createServer } from "http"

import Events from "events"

const myEvent = new Events()

function onData(data) {
  const items = []

  // it's interesting to add a name to the function
  // in the flame graph, it will be easier to identify

  // this line below it should be the issue - it's breaking the memory for Clinicjs
  // Clinics is not generating the HTML
  // setInterval(function intervalHandler() {
  //   items.push(data)
  // })
}

// flame-ox -> returned lines 21:29 as running the most of the time
const server = createServer((req, res) => {
  myEvent.on("data", onData)

  myEvent.emit("data", Date.now())

  res.end()
}).listen(3000, () => {
  console.log(`Running on ${server.address().port}`)
})

// process.memoryUsage() returns an object with the memory usage of the Node.js process measured in bytes.
// rss: Resident Set Size, the amount of space occupied in the main memory device (RAM)

// MEMORY USED:
// 3345
