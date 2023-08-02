const Product = require("../../entities/product")

class ProductDataBuidler {
  constructor() {
    // default is with valid data
    this.productData = {
      id: "00001",
      name: "computer",
      price: 1000,
      category: "eletronic"
    }
  }

  static asProduct() {
    return new ProductDataBuidler()
  }

  withInvalidId() {
    this.productData.id = "1"

    return this
  }

  withInvalidName() {
    this.productData.name = "abc123"

    return this
  }

  withInvalidPrice() {
    this.productData.price = 2000

    return this
  }

  withInvalidCategory() {
    this.productData.category = "mecanic"

    return this
  }

  build() {
    const product = new Product(this.productData)

    return product
  }
}

module.exports = ProductDataBuidler
