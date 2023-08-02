import { ContextStrategy } from "./base/contextStrategy.js"
import { MongoDBStrategy } from "./strategies/mongoDBStrategy.js"
import { PostgresStrategy } from "./strategies/postgresStrategy.js"

const postgresConnectionString =
  "postgres://carlohcs:pass0001@localhost:5432/strategy"
const postgresContext = new ContextStrategy(
  new PostgresStrategy(postgresConnectionString)
)
await postgresContext.connect()

const mongoDBConnectionString =
  "mongodb://carlohcs:0001pass@localhost:27017/strategy"
const mongoDBContext = new ContextStrategy(
  new MongoDBStrategy(mongoDBConnectionString)
)
await mongoDBContext.connect()

// To debug
// const result = await postgresContext.connect()
// console.log({ result })

const data = [
  {
    name: "Carlos Henrique",
    type: "transaction"
  },
  {
    name: "John Doe",
    type: "activityLog"
  }
]

// INSERTION

// await postgresContext.create({ name: data[0].name })
// console.log(await postgresContext.read())

// await mongoDBContext.create({ name: data[1].name })
// console.log(await mongoDBContext.read())

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext
}

for (const { type, name } of data) {
  const context = contextTypes[type]
  await context.create({ name: `${name}-${Date.now()}` })

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}
