const { describe, it } = require("mocha")
const { expect } = require("chai")
const Person = require("../app/src/person")

describe("Person", () => {
  it("generates a person instance from properties list", () => {
    const content = [
      "Xuxa da Silva",
      "brasileira",
      "casada",
      "CPF 235.743.420-12",
      "residente e domociliada a Rua dos bobos",
      "zero",
      "bairro Alphaville",
      "São Paulo."
    ]

    const result = new Person(content)
    const expected = {
      name: "Xuxa da Silva",
      nacionality: "Brasileira",
      civilStatus: "Casada",
      cpf: "23574342012",
      street: "Rua dos bobos",
      number: "zero",
      district: "Alphaville",
      city: "São Paulo"
    }

    expect(result).to.be.deep.equal(expected)
  })
})
