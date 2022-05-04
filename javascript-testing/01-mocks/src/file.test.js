// @see: 
// https://javascriptexpert.club.hotmart.com/lesson/3eaY1ookeg/trabalhando-com-mocks

const { error } = require("./constants.js")
const File = require("./file")
const { rejects, deepStrictEqual } = require("assert")

;(async () => {
  {
    const filePath = "../fixtures/emptyFile-invalid.csv"
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = "../fixtures/fourItems-invalid.csv"
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = "../fixtures/invalid-header.csv"
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = "../fixtures/threeItems-valid.csv"
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        name: "Carlos Henrique",
        id: 123,
        profession: "Software Engineer",
        birthDay: 1993
      },
      {
        name: "Pai de familia",
        id: 321,
        profession: "Ator",
        birthDay: 1972
      },
      {
        name: "Pivete",
        id: 213,
        profession: "Trolador do JC",
        birthDay: 2004
      }
    ]
    deepStrictEqual(JSON.stringify(expected), JSON.stringify(result))
  }
})()
