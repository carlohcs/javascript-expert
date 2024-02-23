// docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=carlohcs -e MONGO_INITDB_ROOT_PASSWORD="0001pass" -p 27017:27017 -d mongo:4

import { MongoClient } from "mongodb"
import { createServer } from "http"
import { promisify } from "util"

async function dbConnect() {
  const client = new MongoClient("mongodb://carlohcs:0001pass@localhost:27017")

  await client.connect()

  console.log("mongo is connected!")

  const db = client.db("comics")

  return {
    collections: { heroes: db.collection("heroes") },
    client
  }
}

const { collections, client } = await dbConnect()

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data)

      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString()
      })

      const heroes = await collections.heroes.find().toArray()

      // console.log({ heroes })

      response.writeHead(200)
      response.write(JSON.stringify(heroes))
    } catch (error) {
      console.log("Error on request: ", error)
      response.writeHead(500)
      response.write(JSON.stringify({ message: "internal server error " }))
    } finally {
      response.end()
    }
  }

  // mongo is connected!
  // {
  //   heroes: [
  //     {
  //       _id: new ObjectId('65d7f8b42798aac18cd0b66f'),
  //       updatedAt: '2024-02-23T01:45:24.344Z',
  //       name: 'Flash'
  //     }
  //   ]
  // }
}

// if we want to kill this process, run on the terminal:
// $ kill 79173

// add data:
// $ curl -i localhost:3000 -X POST -d '{"name": "Batman", "age": 58 }'

// to see formatted (-i it adds the output to a file name as the remote file - in another words, add information not handled by jq):
// $ curl localhost:3000 -X POST -d '{"name": "Batman", "age": 58 }' | jq
const server = createServer(handler).listen(3000, () =>
  console.log(
    `Running at ${server.address().port}.\n Process id: ${process.pid}`
  )
)

// paths that usually the application it will be called to be killed:
// ctrl + c
// kill {PID}

// SIGTERM -> kill {PID}
// SIGINT -> ctrl + c
const onStop = async (signal) => {
  console.info(`\nSignal received:`, signal)

  console.log("Closing server...")

  await promisify(server.close.bind(server))()

  console.log("Http server has closed!")

  // .close.true => force the killing
  await client.close()

  console.log("Mongo connection has closed!")

  // 0 -> is everything OK
  process.exit(0)

  // 1 -> there is some error
  // process.exit(1)
}

;["SIGINT", "SIGTERM"].map((signal) => process.on(signal, onStop))

// process.on('uncaughtException') // for exceptions
// process.on('unhandledRejection') // for promises