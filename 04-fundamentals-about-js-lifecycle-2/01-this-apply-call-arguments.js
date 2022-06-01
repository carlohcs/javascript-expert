"use strict"

// Article:
// https://medium.com/@erickwendel/node-v14-x-is-up-deep-diving-into-new-features-ace6dd89ac0b

const {
  watch,
  promises: { readFile }
} = require("fs")

// watch(__filename, async (event, filename) => {
//   console.log("this file!", event, filename)
//   console.log((await readFile(`${__dirname}/${filename}`)).toString())
// })

class File {
  watch(event, filename) {
    console.log("this", this)
    // console.log("arguments", arguments) // object
    console.log("arguments", Array.prototype.slice.call(arguments)) // array
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(`${__dirname}/${filename}`)).toString())
  }
}

const file = new File()
// watch(__filename, file.watch)
// Uncaught TypeError TypeError: this.showContent is not a function

// Alternative to not inheritance this from function
// watch(__filename, (event, filename) => file.watch(event, filename))

// Alternative preferred
// watch(__filename, file.watch.bind(file))

// Call
// Calls a method of an object, substituting another object for the current object.
file.watch.call(
  { showContent: () => console.log("call: hey sinon!") },
  null,
  __filename
)

// Apply
// Calls the function, substituting the specified object for the this value of the function,
// and the specified array for the arguments of the function.
file.watch.apply({ showContent: () => console.log("apply: hey sinon!") }, [
  null,
  __filename
])

// Bind
// For a given function, creates a bound function that has the same body as the original function.
// The this object of the bound function is associated with the specified object,
// and has the specified initial parameters.
const fn = file.watch.bind(
  { showContent: () => console.log("bind: hey sinon!") },
  null,
  __filename
)
console.log(fn())
