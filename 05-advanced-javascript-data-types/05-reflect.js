// Refs:
// https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-2-reflect/
// Where is used on NODE.js: https://github.com/nodejs/node/blob/05847a71e9c5d432d10a795e6df6e3655afed172/lib/internal/per_context/primordials.js#L25

// AIM:
// Ensure semantic and security on objects

"use strict"

const assert = require("assert")

// apply

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// someone can change the prototype of the object and we can have issues
// Function.prototype.apply = () => {
//   throw new TypeError("my new apply method")
// }

// or do the same for the object
myObj.add.apply = function () {
  throw new TypeError("my new apply method")
}

assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "my new apply method"
})

// using Reflect:
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])

assert.deepStrictEqual(result, 260)

// ==== Semantic

function MyDate() {}

// weird: a Object adding properties to a Function?
Object.defineProperty(MyDate, "withObject", { value: () => "Hey object!" })

// better
Reflect.defineProperty(MyDate, "withReflect", { value: () => "Hey reflect!" })

assert.deepStrictEqual(MyDate.withObject(), "Hey object!")

assert.deepStrictEqual(MyDate.withReflect(), "Hey reflect!")

// Deleting things
const withDelete = { user: "Carlohcs" }

// not performatic, we should avoid
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false)

// better

const withReflection = { user: "Carlos" }

Reflect.deleteProperty(withReflection, "user")

assert.deepStrictEqual(withReflection.hasOwnProperty("user"), false)

// ---- GET

// We should use getters only for reference instances
assert.deepStrictEqual((1)["userName"], undefined)

// with reflection, exception is thrown
assert.throws(() => Reflect.get(1, "userName", TypeError))

// ---- HAS

assert.ok("superman" in { superman: "" })

// better, we have a more semantic idea
assert.ok(Reflect.has({ batman: "" }, "batman"))

// ---- ownKeys
const user = Symbol("user")
const databaseUser = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "carlohcs"
}

// with object methods, we need to do 2 operations
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]

assert.deepStrictEqual(objectKeys, ["id", Symbol.for("password"), user])

// with reflection, just one method
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [
  "id",
  Symbol.for("password"),
  user
])
