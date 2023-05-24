// Proxy and Node.js timers: setInterval, setImmediate, setTimeout e .nextTick()

// We can add observers to our objects and we can notify to other objects/events as we want

// References:
// https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-3-proxies/
// On Node.js: https://github.com/nodejs/node/blob/630afc37032f7499fbb2d16b177bc090f603a672/lib/internal/http2/core.js#L1342

// It's good to keep an eye on:
// https://nodejs.dev/learn/the-nodejs-event-loop
// https://nodejs.dev/learn/understanding-process-nexttick
// https://nodejs.dev/learn/understanding-setimmediate
// https://nodejs.dev/learn/discover-javascript-timers
// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

"use strict"

const Event = require("events")
const event = new Event()
const eventName = "counter"

event.on(eventName, (msg) => console.log("[Counter updated]", msg))

// Testing
event.emit("counter", "FIRST CALL")

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue

    return true
  },
  get: (object, prop) => {
    console.log("Proxy it was called: ", object[prop])

    return object[prop]
  }
})

setInterval(function () {
  proxy.counter += 1
  console.log("[3] setInterval")
  if (proxy.counter === 10) clearInterval(this)
}, 200)

// People usually do this in order to run FIRST. But we should avoid
// we should always use more than 0
setTimeout(() => {
  proxy.counter = 4
  console.log("[2] setTimeout")
}, 10) // 0

// But we should use:
setImmediate(() => {
  console.log("[1] setImmediate")
})

// I can run a command NOW, but it will finish the Node lyfecycle
process.nextTick(() => {
  proxy.counter = 2
  console.log("[0] nextTick: ")
})
