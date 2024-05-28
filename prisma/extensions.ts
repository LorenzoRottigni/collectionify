import type { Collection } from "./../src/types"

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

const xPrisma = prisma.$extends({
  name: 'myExtension',
  model: {
    user: {
      async findParent(collection: Collection, collections: Collection[]) {
        return findCollectionParent(collection,collections)
      },
    },
  },
})
