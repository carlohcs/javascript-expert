import { createServer } from "http"
import { BusinessError } from "./src/error/business-error.js"
import { statusCodes } from "./src/utils/http-status-codes.js"

function validateHero(hero) {
  if (hero?.age < 28) {
    throw new BusinessError("age must be higher than 28")
  }

  if (hero.name?.length < 4) {
    throw new BusinessError("name length must be higher than 4")
  }

  if (Reflect.has(hero, "connectionError")) {
    throw new Error("error connection to DB.")
  }
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data)

      validateHero(hero)

      response.writeHead(statusCodes.OK)
      response.end(JSON.stringify(hero))
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST)
        response.end(error.message)

        continue
      }

      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
    } finally {
      response.end()
    }
  }
}

const server = createServer(handler).listen(3000, () =>
  console.log(`Listening on ${server.address().port}`)
)

// VALID
// curl -i localhost:3000 -X POST -d '{"name": "Batman", "age": 58 }'

// INVALID
// curl -i localhost:3000 -X POST -d '{"name": "Bat", "age": 10 }'

// connectionError
// curl -i localhost:3000 -X POST -d '{"connectionError": "true" }'