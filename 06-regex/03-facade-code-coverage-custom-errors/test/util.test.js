// package.json with 'type=module' require will not work on anymore on Node > 14
"use strict"

const { describe, it } = require("mocha")
const { expect } = require("chai")
const { InvalidRegexError, evaluateRegex } = require("../app/src/util")

describe("Util", () => {
  describe("#evaluateRegex", () => {
    it("throws an error using an unsafe regex", () => {
      const unsafeRegex = /^([\w|\d]+\s?)+$/

      // THIS IS CATASTROPHIC BACKTRACKING:
      // time \
      // node --eval "/^([\w|\d]+\s?)+$/".test('this will break your cpu') && console.log('will not run')
      // ==>  0.00s user 0.00s system 42% cpu 0.001 total

      expect(() => evaluateRegex(unsafeRegex)).to.throw(
        InvalidRegexError,
        `This ${unsafeRegex} is unsafe dude!`
      )
    })
  })

  it("not throws an error using a safe regex", () => {
    const safeRegex = /^([\w|\d])$/

    expect(() => evaluateRegex(safeRegex)).to.not.throw
    expect(evaluateRegex(safeRegex)).to.deep.equal(safeRegex)
  })
})
