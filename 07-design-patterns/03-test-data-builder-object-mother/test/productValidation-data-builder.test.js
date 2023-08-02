const { expect } = require("chai")
const { it, describe } = require("mocha")
const { productValidator } = require("../src")
const ProductDataBuidler = require("./model/productDataBuilder")

// ProductId: should be between 2 and 20 characters
// Name: should be only words
// Price: should be from zero to a thousand
// Category: sould be eletronic or organic

describe("Test Data Builder", () => {
  it("returns no error with valid product", () => {
    const product = ProductDataBuidler.asProduct().build()
    const result = productValidator(product)

    const expected = {
      errors: [],
      result: true
    }

    expect(result).to.be.deep.equal(expected)
  })

  describe("Product Validation Rules", () => {
    it("returns an object error when creating a Product with invalid id", () => {
      const product = ProductDataBuidler.asProduct().withInvalidId().build()
      const result = productValidator(product)

      const expected = {
        errors: [
          "id: invalid length, current [1] expected to be between 2 and 20"
        ],
        result: false
      }

      expect(result).to.be.deep.equal(expected)
    })
    it("returns an object error when creating a Product with invalid name", () => {
      const product = ProductDataBuidler.asProduct().withInvalidName().build()
      const result = productValidator(product)

      const expected = {
        errors: [
          "name: invalid value, current [abc123] expected to have only words"
        ],
        result: false
      }

      expect(result).to.be.deep.equal(expected)
    })
    it("returns an object error when creating a Product with invalid price", () => {
      const product = ProductDataBuidler.asProduct().withInvalidPrice().build()
      const result = productValidator(product)

      const expected = {
        errors: [
          "price: invalid value, current [2000] expected to be between 1 and 1000"
        ],
        result: false
      }

      expect(result).to.be.deep.equal(expected)
    })
    it("returns an object error when creating a Product with invalid category", () => {
      const product = ProductDataBuidler.asProduct()
        .withInvalidCategory()
        .build()
      const result = productValidator(product)

      const expected = {
        errors: [
          "category: invalid value, current [mecanic] expected to be eletronic or organic"
        ],
        result: false
      }

      expect(result).to.be.deep.equal(expected)
    })
  })
})
