import { STATUS_CODES } from "http"

const normalizeHttpErrorName = (name) => name.toUpperCase().replace(/\s/g, "_")

const statusCodes = Object.keys(STATUS_CODES)
  .map((code) => ({
    [normalizeHttpErrorName(STATUS_CODES[code])]: parseInt(code)
  }))
  .reduce(
    (prev, next) => ({
      ...prev,
      ...next
    }),
    {}
  )

export { statusCodes }
