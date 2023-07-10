const rewiremock = require("rewiremock/node")
const { deepStrictEqual } = require("assert")

// Could be on other file
const dbData = [{ name: "José" }, { name: "Maria" }]

class MockDatabase {
  connect = () => this
  find = async (query) => dbData
}

rewiremock(() => require("../src/util/database")).with(MockDatabase)
;(async () => {
  {
    const expected = [{ name: "JOSÉ" }, { name: "MARIA" }]

    rewiremock.enable()

    const UserFactory = require("../src/factory/userFactory")

    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()

    deepStrictEqual(result, expected)

    rewiremock.disable()
  }
  {
    const expected = [{ name: "CARLOS HENRIQUE" }]

    const UserFactory = require("../src/factory/userFactory")

    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()

    deepStrictEqual(result, expected)
  }
})()
