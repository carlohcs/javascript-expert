// Ref:
// https://javascript.info/async-iterators-generators
// https://jakearchibald.com/2017/async-iterators-and-generators/
// https://github.com/nodejs/node/blob/b938f88204945b02fb9a79b387c4961714fdaeb0/lib/internal/fs/dir.js#L222

// Examples of use:
// https://www.youtube.com/watch?v=rcQgqerZ48E

const assert = require("assert")

function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function* main() {
  yield "Hello"
  yield "-"
  yield "World"
  // if we want to run the function, we need to put *
  yield* calculation(20, 10)
}

const generator = main()
// console.log(generator.next())
// {value: 'Hello', done: false}

// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// {value: '-', done: false}
// {value: 'World', done: false}
// {value: undefined, done: true}

// console.log(generator.next())
// {value: 200, done: false}

assert.deepEqual(
  generator.next(),
  { value: "Hello", done: false },
  "generator.next() !== { value: 'Hello', done: false }"
)
assert.deepEqual(
  generator.next(),
  { value: "-", done: false },
  "generator.next() !== { value: '-', done: false }"
)
assert.deepEqual(
  generator.next(),
  { value: "World", done: false },
  "generator.next() !== { value: 'World', done: false }"
)
assert.deepEqual(
  generator.next(),
  { value: 200, done: false },
  "generator.next() !== { value: 200, done: false }"
)
assert.deepEqual(
  generator.next(),
  { value: undefined, done: true },
  "generator.next() !== { value: undefined, done: true }"
)

// console.log('Array.from', ['Hello', '-', 'World', 200])
assert.deepEqual(Array.from(main()), ["Hello", "-", "World", 200])

// console.log('[...main()]', ['Hello', '-', 'World', 200])
assert.deepEqual([...main()], ["Hello", "-", "World", 200])

// ASYNC ITERATORS
const { readFile, stat, readdir } = require("fs/promises")

function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve("Hey Dude")
}

async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

// console.log('promisified', [...promisified()])
// promisified [ Promise { <pending> }, Promise { 'Hey Dude' } ]

Promise.all([...promisified()]).then((results) =>
  console.log("promisified", results)
)

// promisified (2) [Buffer(1867), 'Hey Dude']

// promisified [
//   Buffer(1867) [99, 111, 110, 115, 116, 32, 97, 115, 115, 101, 114, 116, 32, 61, 32, 114, 101, 113, 117, 105, 114, 101, 40, 34, 97, 115, 115, 101, 114, 116, 34, 41, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 42, 32, 99, 97, 108, 99, 117, 108, 97, 116, 105, 111, 110, 40, 97, 114, 103, 49, 44, 32, 97, 114, 103, 50, 41, 32, 123, 10, 32, 32, 121, 105, 101, 108, 100, 32, 97, 114, 103, 49, 32, 42, 32, 97, 114, 103, 50, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, …]
//   'Hey Dude'
// ]
;(async () => {
  // for await (const item of promisified()) {
  //   // console.log('for await', item.toString());
  //   // shows the entire file
  //   // Hey Dude

  //   console.log("for await", item)
  //   // Buffer (2539)
  //   // Hey Dude
  // }

  for await (const item of systemInfo()) {
    console.log("systemInfo", item)

    // promisified (2) [Buffer(3004), 'Hey Dude']
    // systemInfo {size: 3004}
    // systemInfo {dir: Array(1)}
  }
})()
