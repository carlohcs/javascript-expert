// Refs:
// - https://chamikakasun.medium.com/javascript-prototype-and-prototype-chain-explained-fdc2ec17dd04
// - https://chamikakasun.medium.com/javascript-factory-functions-vs-constructor-functions-585919818afe
// Everything on JavaScript it's an object. And object __proto__ is null. So everything is from null?!

const assert = require('assert')
const obj = {}
const arr = []
const fn = () => {}

console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__)
// true

console.log('new Object().__proto__ === {}.__proto__', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ is reference to from object that has the properties inside of it
console.log("obj.__proto__ === Object.prototype", obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log("arr.__proto__ === Array.prototype", arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)

console.log("fn.__proto__ === Function.prototype", fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

console.log('obj.prototype', obj.__proto__) // {}

// __proto__ from Object.prototype === null
console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null)
assert.deepStrictEqual(obj.__proto__.__proto__, null)

// --------------------

function Employee() {}
Employee.prototype.salary = () => "salary**"
// console.log(Employee.prototype.salary())

function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype)
// console.log(Supervisor.prototype.salary())
Supervisor.prototype.profitShare = () => "profitShare"

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBusiness = () => "monthlyBusiness"

// We can call via prototype, but not directly
// console.log(Manager.prototype.monthlyBusiness())
// monthlyBusiness

// Manager.monthlyBusiness()
// TypeError: Manager.monthlyBusiness is not a function

// If we dont call "new", the first __proto__ will be
// instancy from Function, without inheritance our defined classes
// To access the class without new, we can access directly by prototype
console.log(Manager.prototype.__proto__ === Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

// when we call new, the __proto__ receives the prototype

console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary())
// manager.__proto__: Employee { monthlyBusiness: [Function (anonymous)] }, manager.salary(): salary**

console.log(Supervisor.prototype === new Manager().__proto__.__proto__)

console.log('-------')

const manager = new Manager();
console.log('manager.salary() ', manager.salary())
console.log('manager.profitShare() ', manager.profitShare())
console.log('manager.monthlyBusiness() ', manager.monthlyBusiness())

console.log(manager.__proto__) // -> Manager {monthlyBusiness: ƒ}
console.log(manager.__proto__.__proto__) // -> Supervisor {profitShare: ƒ}
console.log(manager.__proto__.__proto__.__proto__) // -> Employee {salary: ƒ, constructor: ƒ}
console.log(manager.__proto__.__proto__.__proto__.__proto__) // -> Object {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__) // -> null

assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

console.log('-------')

class T1 {
  ping() { return 'ping' }
}

class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3();
console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null)
console.log('t3.ping()', t3.ping())
console.log('t3.pong()', t3.pong())
console.log('t3.shoot()', t3.shoot())
assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)