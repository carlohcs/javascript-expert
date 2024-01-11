import { expect, describe, test, jest, beforeEach } from "@jest/globals"

import { RickAndMortyUSA } from "../../src/business/integrations/rickAndMortyUSA.js"
import { RickAndMortyUSAAdapter } from "../../src/business/adapters/rickAndMortyUSAAdapter.js"

describe("#RickAndMortyUSAAdapter", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test("#getCharacters is an adapter for RickAndMortyUSA.getCharactersFromXML", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockResolvedValue([])

    const result = await RickAndMortyUSAAdapter.getCharacters()

    expect(result).toStrictEqual([])

    expect(brlIntegration).toHaveBeenCalled()
  })
})
