// # Type coercion & Objects lifecycle: toString, valueOf e Symbol.toPrimitive
// Refs: 
// - https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839
// - https://dorey.github.io/JavaScript-Equality-Table/

// Type coercion -> conversion of type: eg.: string -> number

/*
3 types:
- Number
- String
- Boolean

Implicitly and explicitly

https://dorey.github.io/JavaScript-Equality-Table/

Use always === -> doesn't make coercion type
== -> makes coercion type
*/

// ## Examples

9999999999999999 // 16
// 10000000000000000

true + 2
// 3

"21" + true
// '21true'

"21" - true
// 20

"21" - -1
// 22

0.1 + 0.2
// 0.30000000000000004

0.1 + 0.2 === 0.3
// false

3 > 2
// true

3 > 2 > 1
// false

3 > 2 >= 1
// true

"B" + "a" + +"a" + "a"
// 'BaNaNa'

"1" == 1
// true

"1" === 1
// false

// -----------

// Explicitly
String(123)
// '123'

// Implicitly
123 + ""
// '123'

// || -> returns the value from left -> if the both are true
"hello" || 123 === "hello"
// 'hello'

const ror = "hello" || 123
console.log(r)
// 'hello'

// && -> returns the last element
const requal = "hello" && 123
console.log(requal)
// 123

// -----------
let item = {
  name: "Carlos Henrique",
  age: 29
}

console.log("item: ", item + 0)

// item:  [object Object]0

item = {
  name: "Carlos Henrique",
  age: 29,
  toString() {
    return `Name ${this.name}, Age: ${this.age}`
  }
}

console.log("item: ", item + 0)

// item:  Name Carlos Henrique, Age: 290

item = {
  name: "Carlos Henrique",
  age: 29,
  toString() {
    return `Name ${this.name}, Age: ${this.age}`
  },
  valueOf() {
    return 007
  }
}

console.log("item: ", item + 0)

// item: 7

// If is a number
// First: valueOf
// Second: toString

// If is a string
// First: toString
// Second: valueOf

console.log("valueOf: ", Number(item))
// item:  7

console.log("toString: ", String(item))
// item:  Name Carlos Henrique, Age: 29

item = {
  name: "Carlos Henrique",
  age: 29,
  toString() {
    return `Name ${this.name}, Age: ${this.age}`
  },
  valueOf() {
    return { hey: "dude" }
  }
}

console.log("valueOf: ", Number(item))
// valueOf: NaN

item = {
  name: "Carlos Henrique",
  age: 29,
  toString() {
    return `Name ${this.name}, Age: ${this.age}`
  },
  valueOf() {
    return { hey: "dude" }
  },
  // Preference from the others
  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to: ", coercionType)
    const types = {
      string: JSON.stringify(this),
      number: "009"
    }

    return types[coercionType] || types.string
  }
}

console.log("String: ", String(item))
console.log("Number: ", Number(item))
// conversion default
console.log("Date: ", new Date(item))
// Invalid Date

// -----------

console.assert(item + 0 === '{"name":"Carlos Henrique","age":29}0')

console.assert(!!item)

console.assert("Ae".concat(item) === 'Ae{"name":"Carlos Henrique","age":29}')

console.assert(item == String(item))

item2 = { ...item, name: "João", age: 50 }
// console.log('New Object: ', item2);
console.assert(item2.name === "João" && item2.age === 50)


// SOME POINTS:

// (3 > 2 > 1) => (3 > 2), true. true > 2 -> false

// Returns the first valid value
// (false || 0 || 'hello' || 'word') === 'hello'.
