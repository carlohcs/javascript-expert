const assert = require("assert")

// KEYS
const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = "value for normal Objects"
user[uniqueKey] = "value for symbol"

// console.log("getting normal Objects value for normal Objects:", user.userName)
// console.log("getting normal Objects:", user[Symbol("userName")])
// value for normal Objects
// getting normal Objects: undefined -> it's necessary to be exported to be accessed or get the reference as below

// this works
// console.log("getting normal Objects:", user[uniqueKey])
// getting normal Objects: value for symbol

assert.deepStrictEqual(user.userName, "value for normal Objects")

// always unique in memory adress level
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], "value for symbol")

// console.log('symbols', Object.getOwnPropertySymbols(user))
// (1) [ Symbol(userName) ]
// 0: Symbol(userName)

// It's harder to catch, but isn't secret
// in console.log returns: symbols Symbol(userName)
// in debugger returns
//  Symbol(userName):'value for symbol'
//   userName:'value for normal Objects'
// console.log('symbols', Object.getOwnPropertySymbols(user)[0])
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - bad practice (doesn't appears in node codebase)
user[Symbol.for("password")] = 123
assert.deepStrictEqual(user[Symbol.for("password")], 123)
// // KEYS

// Well Know Symbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        // remove the last item and return it
        value: this.items.pop()
      }
    }
  })
}

// for (const item of obj) {
//   console.log("item: ", item)
// }
// item:  a
// item:  b
// item:  c

assert.deepStrictEqual([...obj], ["a", "b", "c"])

const kItems = Symbol("kItems")
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg))
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError()

    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric"
      }).format(item)
    )

    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction"
    }).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }

  get [Symbol.toStringTag]() {
    return "WHAT?"
  }
}

const myDate = new MyDate([2022, 03, 01], [2021, 02, 02])

const expectedDates = [new Date(2022, 03, 01), new Date(2021, 02, 02)]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), "[object WHAT?]")
assert.throws(() => myDate + 1, TypeError)

// Explicity coercion when calls toPrimitive
assert.deepStrictEqual(
  String(myDate),
  "01 de abril de 2022 e 02 de março de 2021"
)

// iterator

// without *[Symbol.iterator]()
// assert.deepStrictEqual([...myDate], expectedDates)
// Uncaught TypeError TypeError: myDate is not iterable

// with *[Symbol.iterator]()
assert.deepStrictEqual([...myDate], expectedDates)

// ;(async () => {
//   for await (const item of myDate) {
//     // 2022-04-01T03:00:00.000Z
//     // 2021-03-02T03:00:00.000Z
//   }
// })()
// with Symbol.iterator
;(async () => {
  const dates = await Promise.all([...myDate])
  assert.deepStrictEqual(dates, expectedDates)
})()

// with Symbol.asyncIterator
;(async () => {
  const dates = []

  for await (const date of myDate) {
    dates.push(date)
  }

  const expectedDatesInISOString = expectedDates.map((item) =>
    item.toISOString()
  )

  assert.deepStrictEqual(dates, expectedDatesInISOString)
})()
