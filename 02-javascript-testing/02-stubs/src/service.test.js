const sinon = require("sinon")
const Service = require("./service")
const { deepStrictEqual } = require("assert")
const BASE_URL_1 = "https://swapi.dev/api/planets/1"
const BASE_URL_2 = "https://swapi.dev/api/planets/2"
const fixtures = {
  tatooine: require("../fixtures/tatooine.json"),
  alderaan: require("../fixtures/alderaan.json")
}

;(async () => {
  {
    // Go to internet!
    const service = new Service()
    service.makeRequest(BASE_URL_1).then((data) => {
      deepStrictEqual(data.name, "Tatooine")
    })
  }

  {
    try {
      const service = new Service()
      await service.makeRequest("http://foo.bar")
    } catch (error) {
      deepStrictEqual(error.code, "ERR_INVALID_PROTOCOL")
    }
  }

  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub.withArgs(BASE_URL_1).resolves(fixtures.tatooine)

  stub.withArgs(BASE_URL_2).resolves(fixtures.alderaan)

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5
    }
    const response = await service.getPlanets(BASE_URL_1)

    deepStrictEqual(expected, response)
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2
    }
    const response = await service.getPlanets(BASE_URL_2)

    deepStrictEqual(expected, response)
  }
})()
