// ls | grep package | xargs cat | jq.name

// process.stdin
//   .pipe(process.stdout)
//   .on("data", (msg) => {
//     // This will print the data from the input stream
//     console.log("Data:", msg) // msg.toString() to sse the data
//   })
//   .on("error", (err) => {
//     console.error("Error:", err)
//   })
//   .on("end", (_) => { // usually we don't need to handle
//     console.log("End of stream")
//   })
//   .on("close", (_) => { // usually we don't need to handle
//     console.log("Stream closed")
//   })

// terminal 1
// create a server to listen to the data
// node -e "require('net').createServer((socket) => socket.pipe(process.stdout)).listen(1338)"

// terminal 2
// send the data to the server
// node -e "process.stdin.pipe(require('net').connect(1338))"

// create a big file
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import { createReadStream, readFileSync } from "fs"
import http from "http"

const server = http
  .createServer((req, res) => {
    // bad practice,
    // it loads the whole file into memory, but it breaks the application -> ERR_STRING_TOO_LONG
    // const file = readFileSync("big.file").toString()

    // not so good practice,
    // it turns into a stream, so it doesn't load the whole file into memory
    // const file = readFileSync("big.file")
    // res.write(file)
    // res.end()

    // To limit the quantity of data sent to the client, use the `highWaterMark` option
    // createReadStream("big.file", { highWaterMark: 5 }).pipe(res)
    createReadStream("big.file").pipe(res)
  })
  .listen(3000, () => console.log("running at", server.address().port))

// curl localhost:3000 -o output.txt
