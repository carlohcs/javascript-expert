// Refs:
// https://medium.com/@leonardobrunolima/javascript-tips-set-and-weakset-53be9d264fb1
// https://medium.com/front-end-weekly/es6-set-vs-array-what-and-when-efc055655e1a
// https://javascript.info/map-set

//
// url.js: https://github.com/nodejs/node/blob/00b5ee6083bfbd8e3f63a574411300c5e5f42bd7/lib/url.js#L105
// iterable_weak_map.js: https://github.com/nodejs/node/blob/cef144421c5ff6e9677ecf0b7a607000b744aa13/lib/internal/util/iterable_weak_map.js#L34
// event_target.js: https://github.com/nodejs/node/blob/dc79f3f37caf6f25b8efee4623bec31e2c20f595/lib/internal/event_target.js#L95

const assert = require("assert")

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2).sort()

assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"])

const set = new Set()
arr1.map((item) => set.add(item))
arr2.map((item) => set.add(item))

// console.log(set)
// Object

assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"])
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  "0",
  "1",
  "2",
  "3"
])

// They have the same informations
console.log("set.keys", set.keys())
console.log("set.values", set.values()) // just exists because of Map

// in Array, to now if an element exists
// [].indexOf('1') !== -1 or [0].includes(0)
assert.ok(set.has("3"))

// Same theory from Map, but we always work with the entire list
// doesn't have get. At documentation, there are ways to intersect, eg: know what have in another list

// What he have in the both arrays.
const users01 = new Set(["Carlos", "John", "Doe"])

const users02 = new Set(["Maiky", "Carlos", "Foo"])

const intersection = new Set([...users01].filter((user) => users02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ["Carlos"])

const difference = new Set([...users01].filter((user) => !users02.has(user)))
assert.deepStrictEqual(Array.from(difference), ["John", "Doe"])

// ==== WeakSet

// same idea from WeakMap
// isn't numerable (iterable)
// just works with key as reference
// just has simple methods

const user = { id: 123 }
const user2 = { id: 321 }

const weakSet = new WeakSet([user])
weakSet.add(user2)
weakSet.delete(user2)
weakSet.has(user2)

// ==== Conclusions

// So, when is Set better? And when is Array better?
// Firstly, Set is different than Array. It is not meant to replace Array entirely, but to provide additional support type to complete what Array is missing.
// Since Set only contains distinct elements, it makes life much easier if we know in advance we want to avoid saving duplicate data to our structure.
// Basic operations of Set like union(), intersect(), difference(), etc… are easily implemented effectively based on the native built-in operations provided. Due to the delete() method, it makes intersect/union between 2 Sets much more comfortable than doing the same to 2 Arrays.
// Array is meant for scenarios when we want to keep elements ordered for quick access, or do heavy modification (removing and adding elements) or any action required direct index access to elements (for example, try doing Binary Search on Set instead of Array — how do you access the middle located element?)
