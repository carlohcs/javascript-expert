const { describe, it } = require("mocha")
const request = require("supertest")
const app = require("./api")
const assert = require("assert")

describe("API Suit test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200)

      assert.deepStrictEqual(response.text, "contact us page")
    })
  })

  describe("/hello", () => {
    it("should request an inexistente /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200)

      assert.deepStrictEqual(response.text, "Hello World!")
    })
  })

  describe("/login", () => {
    it("should login an successfully on the login route and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "Carlos Henrique",
          password: "123"
        })
        .expect(200)

      assert.deepStrictEqual(response.text, "Login has succeded!")
    })

    it("should unauthorize a request when requesting it using wront credentials ande return HTTP Status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "John",
          password: "doe"
        })
        .expect(401)

      assert.deepStrictEqual(response.text, "Logging failed!")
    })
  })
})
