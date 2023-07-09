"use strict"

const { readFile } = require("fs/promises")
const { join } = require("path")
const pdf = require("pdf-parse")

const TextProcessorFacade = require("./textProcessorFacade")

;(async () => {
  const pdfPath = join(__dirname, "./../../contract.pdf")
  console.log("Loading PDF from...: ", pdfPath)
  const dataBuffer = await readFile(pdfPath)
  const data = await pdf(dataBuffer)
  // console.log("data", data)
  // Saves output to a text file
  // @see: https://guialinux.uniriotec.br/tee/
  // npm start | tee text.txt
  // console.log(data.text)

  const instance = new TextProcessorFacade(data.text)
  const people = instance.getPeopleFromPDF()
  console.log("people: ", people)
})()
