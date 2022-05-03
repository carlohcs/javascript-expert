// @see:
// https://javascriptexpert.club.hotmart.com/lesson/V7y1rqqq7J/trabalhando-com-spies

const Fibonacci = require("./fibonacci")
const sinon = require("sinon")
const assert = require("assert")
// Fibonacci: the next value, will be the sum of the last two
// with 3:
// 0, 1, 1
// 0, 1, 1, 1, 2, 3
;(async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    // generators return iterators (.next)
    // using functions .next, for await, rest/spread
    // fibonacci.execute(3) =>
    for (const i of fibonacci.execute(3)) {
    }

    const expectedCallCount = 4
    assert.deepStrictEqual(expectedCallCount, spy.callCount)
  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    const [...results] = fibonacci.execute(5)
    // [0] input = 5, current = 0, next = 1
    // [1] input = 5, current = 1, next = 1
    // [2] input = 5, current = 1, next = 2
    // [3] input = 5, current = 2, next = 3
    // [4] input = 5, current = 3, next = 5
    // [5] input = 0, -> stop

    const { args } = spy.getCall(2)
    const expectedResult = [0, 1, 1, 2, 3]
    // this object it's just to help to see what were the defined values
    // usually we do: [3, 1, 2] // just to be more readable.
    const expectedParams = Object.values({ input: 3, current: 1, next: 2 })
    
    assert.deepStrictEqual(args, expectedParams)
    assert.deepStrictEqual(results, expectedResult)
  }
})()
