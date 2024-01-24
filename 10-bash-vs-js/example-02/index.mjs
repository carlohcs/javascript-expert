// Try to remove a Docker container named "my-nginx".
// If the container doesn't exist or isn't running, log a message.
// Log a message indicating the start of a new container.
// Run a new Docker container named "my-nginx" using the "nginx:alpine" image, mapping port 3000 on the host to port 80 on the container.
// Log a message indicating the waiting for the container to start, then wait for 500 milliseconds.
// Send a request to "localhost:3000" using the curl command and store the response in the req variable.
// Log the response.
// Finish the script by removing the container.

// Disable verbose mode
// $.verbose = false

import { setTimeout } from 'timers/promises'
import isSafe from 'safe-regex'

// Kill the "my-nginx" container if it's already running
try {
  await $`docker rm -f my-nginx`

  await $`docker ps`
} catch (error) {
  console.log('No running "my-nginx" container to remove')
}

console.log('Starting the container...')

await $`docker run -p "3000:80" -d --name "my-nginx" nginx:alpine`

console.log('Waiting for the container to start...')
await setTimeout(500)

const req = await $`curl localhost:3000` //  --silent
console.log(`req\n`, req.stdout)

const containers = await $`docker ps`

const exp = /(?<containerId>[^\s]*).*(?=my-nginx)/

if(!isSafe(exp)) {
  throw new Error(`Exp is not safe`)
}

// console.log(containers.toString().match(exp))

const { groups: { containerId } } = containers.toString().match(exp)

await $`docker rm -f ${containerId}`

console.log('Done')