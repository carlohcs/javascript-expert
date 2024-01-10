// New Relic and other APMs use this pattern to instrument the code.
InjectHttpInterceptor();

import http from 'http';
import { InjectHttpInterceptor } from '../src/index.js';

// curl -i localhost:3000
function handleRequest(req, res) {
  // res.setHeader('X-Instrumented-By', 'Carlos Henrique');
  res.end('Hello World!');
}

const server = http.createServer(handleRequest);
const port = 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${server.address().port}`);
});
