const ProductDataBuidler = require("./productDataBuilder")

class ProductMotherObject {
  static valid() {
    return ProductDataBuidler.asProduct().build()
  }

  static withInvalidId() {
    return ProductDataBuidler.asProduct().withInvalidId().build()
  }

  static withInvalidName() {
    return ProductDataBuidler.asProduct().withInvalidName().build()
  }

  static withInvalidPrice() {
    return ProductDataBuidler.asProduct().withInvalidPrice().build()
  }

  static withInvalidCategory() {
    return ProductDataBuidler.asProduct().withInvalidCategory().build()
  }
}

module.exports = ProductMotherObject
