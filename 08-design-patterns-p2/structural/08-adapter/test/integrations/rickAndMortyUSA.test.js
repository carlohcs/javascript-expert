import { expect, describe, test, jest, beforeEach } from "@jest/globals"
import fs from "fs/promises"
import { Character } from "../../src/entities/character"
import { RickAndMortyUSA } from "../../src/business/integrations/rickAndMortyUSA"
import axios from "axios"

describe("#rickAndMortyUSA", () => {
  test("#getCharactersJSON returns a list of Character Entity", async () => {
    const response = await fs.readFile("./test/mocks/characters.xml", "utf-8")

    const expected = [
      {
        gender: "Male",
        id: "10",
        location: "Worldender's lair",
        name: "Alan Rails",
        origin: "unknown",
        species: "Human",
        status: "Dead",
        type: "Superhuman (Ghost trains summoner)"
      }
    ]

    jest.spyOn(axios, "get").mockResolvedValue({ data: response })

    const result = await RickAndMortyUSA.getCharactersFromXML()
    expect(result).toMatchObject(expected)
  })

  test("#getCharactersJSON returns an empty list of Character Entity if API returns nothing", async () => {
    const response = await fs.readFile(
      "./test/mocks/characters-empty.xml",
      "utf-8"
    )

    const expected = []

    jest.spyOn(axios, "get").mockResolvedValue({ data: response })

    const result = await RickAndMortyUSA.getCharactersFromXML()
    expect(result).toStrictEqual(expected)
  })
})
