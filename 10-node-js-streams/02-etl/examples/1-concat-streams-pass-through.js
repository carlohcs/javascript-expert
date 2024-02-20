import { Writable, PassThrough } from "stream"
import axios from "axios"

const API_01 = "http://localhost:3000"
const API_02 = "http://localhost:4000"

const requests = await Promise.all([
  axios({
    method: "get",
    url: API_01,
    responseType: "stream"
  }),
  axios({
    method: "get",
    url: API_02,
    responseType: "stream"
  })
])

const results = requests.map(({ data }) => data)

const output = new Writable({
  write(chunk, encode, cb) {
    const data = chunk.toString().replace(/\n/, "")
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name

    // console.log('data', data);

    console.log(`[${name}] ${data}`)

    cb()
  }
})

// result[0].pipe(output)

// this doesnt work: just one at time
// result[0].pipe(output)
// result[1].pipe(output)

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // prevents that stream it closes itself
    current.pipe(prev, { end: false })

    // with end: false -> we need to handle the current stream.
    // when it finishes, let's check if all from the pipeline are done
    // the current one closes the previous one
    current.on("end", () => items.every((currentItemStream) => currentItemStream.ended && prev.end()))

    return prev
  }, new PassThrough())
}

const streams = merge(results).pipe(output)
