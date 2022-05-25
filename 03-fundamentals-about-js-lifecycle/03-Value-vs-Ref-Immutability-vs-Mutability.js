// Value vs ref / Immutability vs Mutability
'use-strict'

const { deepStrictEqual } = require('assert')

let counter = 0
let counter2 = counter
counter2++

// counter2 -> ?
console.log(counter2)

// 1

// Primitive type -> creates a new copy in memory
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

// ==========================================

const item = { counter: 0 }
const item2 = item

item2.counter++

// item2.counter -> ?

console.log(item2.counter)

// 1

// Referency types copy the memory address and points to the same place
deepStrictEqual(item.counter, 1)
deepStrictEqual(item2.counter, 1)

// REFERENCE: https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0

// TRY YOURSELF

function changeAgeAndReference(person) {
  person.age = 25;
  person = {
      name: 'John',
      age: 50
  };
  
  return person;
}
var personObj1 = {
  name: 'Alex',
  age: 30
};
var personObj2 = changeAgeAndReference(personObj1);
console.log(personObj1); // -> ?
console.log(personObj2); // -> ?

// console.log(personObj1); // -> { name: 'Alex', age: 25 }
// console.log(personObj2); // -> { name: 'John', age: 50 }
