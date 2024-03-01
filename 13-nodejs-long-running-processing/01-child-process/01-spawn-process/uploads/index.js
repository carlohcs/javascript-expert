import { spawn } from "child_process"

const pythonFile = "uploads/index.py"
const pythonCommand = "python"

async function requestPython({ url, headers, filePath }) {
  const py = spawn(pythonCommand, [
    pythonFile,
    JSON.stringify({ url, headers, filePath })
  ])

  const dataString = []

  for await (const data of py.stderr) {
    console.error('[python] error:', data.toString())
  }

  for await (const data of py.stdout) {
    console.log('[python] data:', data.toString())
    dataString.push(data.toString())
  }

  return dataString.join("")
}

const result = await requestPython({
  url: "http://localhost:3000",
  headers: { "Content-Type": "json" },
  filePath: "./uploads/my-data.csv"
})

console.log({ result })