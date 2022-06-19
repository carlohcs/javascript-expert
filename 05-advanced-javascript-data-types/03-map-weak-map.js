// Refs:
// https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373
// https://dmitripavlutin.com/maps-vs-plain-objects-javascript/
// https://medium.com/@leonardobrunolima/javascript-tips-map-and-weakmap-f38f9c4ed2b6
// https://javascript.info/map-set

// Node.js core
// encoding.js: https://github.com/nodejs/node/blob/14699846452e627f97dedb85991eea67d932a79d/lib/internal/encoding.js#L76
// inspector.js: https://github.com/nodejs/node/blob/dd5f209213a2b75bb386b44c296a059fc10dfb02/lib/inspector.js#L51
// errors.js: https://github.com/nodejs/node/blob/893d8a60cbf7ae3d42655547beb703249b96d895/lib/internal/errors.js#L78

const assert = require("assert")

// =============== MAP ===============

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
const myMap = new Map()

// could have anything as key
myMap
  .set(1, "one")
  .set("Carlos", { text: "two" })
  .set(true, () => "hello")

const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"]
])

// console.log(myMap)
// console.log(myMapWithConstructor.get(1))

assert.deepStrictEqual(myMap.get(1), "one")
assert.deepStrictEqual(myMap.get("Carlos"), { text: "two" })
assert.deepStrictEqual(myMap.get(true)(), "hello")

// In objects, the key just could be string or symbol (number it's coerged as string)
const obj = { id: 1 }
myMap.set(obj, { name: "Carlos" })

console.log("get by object", myMap.get({ id: 1 }))
// get by object undefined

// ^ only works by reference (memory)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: "Carlos" })

console.log("get by object", myMap.get(onlyReferenceWorks))

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "Carlos" })

// UTILITIES
// At object, Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 5)

// check if item exists
// At object, if(item.key)
// At object, correct way: ({ name: 'Carlos' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// remove an item
// delete item.key -> not recommended - js performance problems
assert.ok(myMap.delete(onlyReferenceWorks))

// we can't iterate over Object directly
// we have to transform at Object.entries(item)
// console.log([...myMap])
//
// [
//   [ 1, 'one' ],
//   [ 'Carlos', { text: 'two' } ],
//   [ true, [Function (anonymous)] ],
//   [ { id: 1 }, { name: 'Carlos' } ]
// ]
// assert.deepStrictEqual(
//   [...myMap],
//   [
//     [1, "one"],
//     ["Carlos", { text: "two" }],
//     [true, () => {}],
//     // [true, [Function(anonymous)]],
//     [{ id: 1 }, { name: "Carlos" }]
//   ]
// )
// AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:
// [true, [Function(anonymous)]]

assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, "one"],
    ["Carlos", { text: "two" }],
    [true, () => {}],
    // [true, [Function(anonymous)]],
    [{ id: 1 }, { name: "Carlos" }]
  ])
)

// we can iterate over Map
// for (const [key, value] of myMap) {
//   console.log(key, value)
// }

// Object is insecure, it can have name colision, eg:
// constructor, toString, valueOf and etc;
assert({}.toString(), "[object Object]")
assert({ toString: () => "Hey joe!" }.toString(), "Hey joe!")

// Map doesn't have key name restriction
const actor = {
  name: "Carlos Henrique"
  // toString: "King: Carlos Henrique"
}
myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// We cannot clear an object without add another value to it
// in Map we do:
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// When we use maps:
// 1 - We need add/remove keys a lot of times
// 2 - Semantic keys
// 3 - Work as database
// 4 - Clear references after use

// Map appears to be a correction of Object, with additional methods

// =============== WEAKMAP ===============

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

// it has the majority of benefits from Map
// But: isn't interative (interation)
// Just keys that we know
// lightweight and prevents memory leaks, because once the instances get off from memory, everything is cleared

// You should ask why use this type of data structure. Let’s see:

// - Keeping private data about a specific object and only giving access to it through a reference to the Map.
// - Keeping data about library objects without changing them.
// - Keeping data about host objects like DOM nodes in the browser.

const weakMap = new WeakMap()
const hero = { name: "Flash" }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)
