import { createServer } from "http"
import { randomUUID } from "crypto"
import { pipeline } from "stream/promises"
import { createWriteStream } from "fs"

async function handler(request, response) {
  const fileName = `file-${randomUUID()}.csv`

  await pipeline(request, createWriteStream(fileName))

  response.end(`File ${fileName} uploaded successfully`);
}

const server = createServer(handler).listen(3000, () =>
  console.log(`Server is running on port ${server.address().port}`)
)

// python index.py '{"filePath": "my-data.csv", "url": "http://localhost:3000"}'