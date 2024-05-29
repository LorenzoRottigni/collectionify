import type { Collection } from "../utils/types"
import { Prisma } from '@prisma/client'

const findCollectionParent = (hay: Collection, haystack: Collection[]): Collection | null => {
  for (const collection of haystack) {
    if (collection?.id === hay.parent?.id) {
      return collection
    } else if (collection?.children) {
      const parent = findCollectionParent(hay, collection?.children)
      if (parent) {
        return parent
      }
    }
  }
  return null
}

export const collectionifyExtension = Prisma.defineExtension({
  name: 'Collection',
  model: {
    collection: {
      async findParent(collection: Collection, collections: Collection[]) {
        return findCollectionParent(collection,collections)
      },
    },
  },
})

