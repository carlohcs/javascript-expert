import { transcode } from "buffer"
import { Duplex, Transform } from "stream"


// eg: socket is a duplex stream - we can read and write data
// usually we don't use this pattern. Usually we have individual objects

let count = 0

const server = new Duplex({
  objectMode: true, // disable buffer handling -> but, spend more memory
  encoding: "utf-8",
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`I'm Carlos[${count}]`)

        return
      }

      clearInterval(intervalContext)

      this.push(null)
    }

    setInterval(function () {
      everySecond(this)
    })
  },

  // it's an different object
  // it's another channel
  write(chunk, encoding, cb) {
    console.log(`[writable] saving`, chunk)
    cb()
  }
})

// actovate writable from Duplex
server.write('[duplex] this is a writable\n')

// on data -> logs what happened on .push
server.on('data', msg => console.log(`[readable] ${msg}`))

// we can push add more data to the stream
server.push(`[duplex] hey this is also a readable!\n`)
// server.pipe(process.stdout)

const transformToUpperCase = new Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase())
  }
})

// transform is also a duplex, but doesn't have a independent communication
transformToUpperCase.write('[transform]  hello from write!')

// push ignores what you have on transform function
transformToUpperCase.push('[transform]  hello from push!')

server
  .pipe(transformToUpperCase)
  // redirect all readable data to writable from duplex
  .pipe(server)