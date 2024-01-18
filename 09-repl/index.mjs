import http from "http"

function netSalary({ discount, salary }) {
  const percent = discount / 100
  const cost = salary * percent

  return salary - cost
}

const server = http
  .createServer((req, res) => {
    const url = req.url.replace("/", "")
    const params = new URLSearchParams(url)
    const data = Object.fromEntries(params)
    const result = netSalary(data)

    res.end(`Net salary: ${result}`)
  })
  .listen(3000, () => console.log("Server running at http://localhost:3000/"))
