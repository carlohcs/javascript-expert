import Http from "http"

async function InjectHttpInterceptor(req, res) {
  const oldEmit = Http.Server.prototype.emit

  Http.Server.prototype.emit = function (...args) {
    const [type, req, response] = args

    if (type === "request") {
      response.setHeader("X-Instrumented-By", "Carlos Henrique")
    }

    return oldEmit.apply(this, args)
  }
}

export { InjectHttpInterceptor }
