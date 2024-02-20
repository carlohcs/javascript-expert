import { Readable, Writable } from "stream"

// data source
const readable = new Readable({
  read() {
    this.push("Hello")
    this.push("World!")

    // When we call push(null), the stream will end
    this.push(null)
  }
})

// data destination
const writable = new Writable({
  write(chunk, encoding, cb) {
    console.log('msg', chunk.toString());

    // to end the execution correctly
    cb();
  }
});

// readable.pipe(writable); // msg Hello\nmsg World!

readable.pipe(process.stdout); // HelloWorld!%