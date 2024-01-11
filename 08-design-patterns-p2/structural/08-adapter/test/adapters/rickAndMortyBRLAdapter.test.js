import { expect, describe, test, jest, beforeEach } from "@jest/globals"

import { RickAndMortyBRL } from "../../src/business/integrations/rickAndMortyBRL.js"
import { RickAndMortyBRLAdapter } from "../../src/business/adapters/rickAndMortyBRLAdapter.js"

describe("#RickAndMortyBRLAdapter", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test("#getCharacters is an adapter for RickAndMortyBRL.getCharactersFromJSON", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name)
      .mockResolvedValue([])

    const result = await RickAndMortyBRLAdapter.getCharacters()

    expect(result).toStrictEqual([])

    expect(brlIntegration).toHaveBeenCalled()
  })
})
