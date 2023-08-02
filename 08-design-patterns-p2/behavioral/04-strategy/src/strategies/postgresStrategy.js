// npm install knex
// https://www.npmjs.com/package/knex
// A package to build queries and communicate with DB

// npm install pg
// https://www.npmjs.com/package/pg
// node-postgres - non-blocking PostgreSQL client for Node.js
import knex from "knex"

export class PostgresStrategy {
  #instance
  constructor(connectionString) {
    this.connectionString = connectionString
    this.table = "warriors"
  }

  async connect() {
    this.#instance = new knex({
      client: "pg",
      connection: this.connectionString
    })

    console.log("Connected to postgres.")
    return this.#instance.raw("select 1+1 as result")
  }

  async create(item) {
    return this.#instance.insert(item).into(this.table)
  }

  async read(item) {
    return this.#instance.select().from(this.table)
  }
}
