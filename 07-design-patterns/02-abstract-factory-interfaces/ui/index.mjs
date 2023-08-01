import { database } from "../shared/data.mjs"

class Application {
  constructor(factory) {
    this.table = factory.createTable()
  }

  initalize(database) {
    this.table.render(database)
  }
}

;(async function main() {
  const applicationEnv = globalThis.window ? "browser" : "console"
  const path = applicationEnv === "browser" ? "Browser" : "Console"
  const { [`${path}Factory`]: Factory } = await import(
    `./../platforms/${path}/index.mjs`
  )

  const app = new Application(new Factory())

  app.initalize(database)
})()
