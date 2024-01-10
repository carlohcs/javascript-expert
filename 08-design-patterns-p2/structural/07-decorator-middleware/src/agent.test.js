import { expect, describe, test, jest, beforeEach } from "@jest/globals"

import { InjectHttpInterceptor } from "./agent"
import { Server } from "http"

// avoid to change the original http module
const originalHttp = jest.createMockFromModule("http")

describe("HTTP Interceptor Agent", () => {
  // when we have a request, the server will emit a 'request' event
  const eventName = "request"
  const request = null

  beforeEach(() => {
    // reset the mock
    jest.clearAllMocks()
  })

  test("does not change header", () => {
    const response = {
      setHeader: jest.fn().mockReturnThis()
    }
    const serverInstance = new originalHttp.Server()
    serverInstance.emit(eventName, request, response)

    expect(response.setHeader).not.toHaveBeenCalled()
  })
  test("activates header interceptor", () => {
    InjectHttpInterceptor()

    const response = {
      setHeader: jest.fn().mockReturnThis()
    }

    const serverInstance = new Server()
    serverInstance.emit(eventName, request, response)

    expect(response.setHeader).toHaveBeenCalledWith(
      "X-Instrumented-By",
      "Carlos Henrique"
    )
  })
})
