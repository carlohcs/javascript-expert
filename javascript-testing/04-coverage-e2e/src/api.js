const http = require("http")
const DEFAULT_USER = { username: "Carlos Henrique", password: "123" }
const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page")

    return response.end()
  },
  "/login:post": async (request, response) => {
    // response is an interator
    for await (const data of request) {
      const user = JSON.parse(data)

      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== user.password
      ) {
        response.writeHead(401)
        response.write("Logging failed!")
        return response.end()
      }

      response.writeHead(200)
      response.write("Login has succeded!")
      return response.end()
    }
  },
  default: (request, response) => {
    response.write("Hello World!")

    return response.end()
  }
}

const handler = function (request, response) {
  const { url, method } = request

  const routeKey = `${url}:${method.toLowerCase()}`

  const chosenRoute = routes[routeKey] || routes.default

  response.writeHead(200, {
    "Content-Type": "text/html"
  })

  return chosenRoute(request, response)
}

const port = 3000

const app = http
  .createServer(handler)
  .listen(port, () => console.log("App running at ", port))

module.exports = app
