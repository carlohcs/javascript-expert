import http from "http"
import { Readable } from "stream"

function api1(request, response) {
  // this is a Readable stream
  // response.write('API 1 -> test-01\n');
  // response.write('API 1 -> test-02\n');
  // response.write('API 1 -> test-02\n');
  // request.pipe(response);

  let count = 0
  let maxItems = 99

  const readable = new Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: Date.now() + count,
              name: `Carlos-${count}`
            }) + "\n"
          )

          return
        }
        clearInterval(intervalContext)
        this.push(null)
      }

      setInterval(function () {
        everySecond(this)
      })
    }
  })

  readable.pipe(response)
}

function api2(request, response) {
  let count = 0
  let maxItems = 99

  const readable = new Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: Date.now() + count,
              name: `Henrique-${count}`
            }) + "\n"
          )

          return
        }
        clearInterval(intervalContext)
        this.push(null)
      }

      setInterval(function () {
        everySecond(this)
      })
    }
  })

  readable.pipe(response)
}

const server1 = http
  .createServer(api1)
  .listen(3000, () => console.log(`Running on ${server1.address().port}`))
const server2 = http
  .createServer(api2)
  .listen(4000, () => console.log(`Running on ${server2.address().port}`))


// Get all data from API 2 and save to file
// ❯ curl localhost:4000 | tee log.txt