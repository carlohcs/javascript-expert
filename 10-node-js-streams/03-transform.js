import { createWriteStream } from "fs"
import { Readable, Writable, Transform } from "stream"

// data source
const readable = new Readable({
  read() {
    // 1e3
    for (let index = 0; index < 1e3; index++) { // it blocks the processing
      const person = { id: Date.now() + index, name: `Carlos-${index}` }
      const data = JSON.stringify(person)

      this.push(data)
    }

    // When we call push(null), the stream will end
    this.push(null)
  }
})

// data processing
const mapFields = new Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`

    cb(null, result)
  }
})

const mapHeaders = new Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0

    if (this.counter) {
      return cb(null, chunk)
    }

    this.counter += 1

    cb(null, "id,name\n".concat(chunk))
  }
})

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  .pipe(createWriteStream('my.csv'))

pipeline.on('end', () => {
  console.log('processing done.');
});