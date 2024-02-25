import { createServer } from "http"

import { statusCodes } from "./src/utils/http-status-codes.js"
import { HeroEntity } from "./src/entity/heroEntity.js"

async function handler(request, response) {
  for await (const data of request) {
    try {
      const parseData = JSON.parse(data)

      if (Reflect.has(this, "connectionError")) {
        throw new Error("error connection to DB.")
      }

      const hero = new HeroEntity(parseData)

      if (!hero.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST)

        response.end(hero.notifications.join("\n"))

        continue
      }

      // save to DB
      response.writeHead(statusCodes.OK)
      response.end(hero.toString())
    } catch (error) {
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
