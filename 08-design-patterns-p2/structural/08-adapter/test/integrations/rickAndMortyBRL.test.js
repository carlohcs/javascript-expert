import { expect, describe, test, jest, beforeEach } from "@jest/globals"
import fs from "fs/promises"
import { Character } from "../../src/entities/character"
import { RickAndMortyBRL } from "../../src/business/integrations/rickAndMortyBRL"
import axios from "axios"

describe("#rickAndMortyBRL", () => {
  test("#getCharactersJSON returns a list of Character Entity", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters.json", "utf-8")
    )
    const expected = response.results.map(
      (character) => new Character(character)
    )

    jest.spyOn(axios, "get").mockResolvedValue({ data: response })
    const result = await RickAndMortyBRL.getCharactersFromJSON()
    expect(result).toStrictEqual(expected)
  })

  test("#getCharactersJSON returns an empty list of Character Entity if API returns nothing", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters-empty.json", "utf-8")
    )
    const expected = response.results.map(
      (character) => new Character(character)
    )

    jest.spyOn(axios, "get").mockResolvedValue({ data: response })
    const result = await RickAndMortyBRL.getCharactersFromJSON()
    expect(result).toStrictEqual(expected)
  })
})
