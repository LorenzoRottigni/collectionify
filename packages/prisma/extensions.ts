import { findCollectionParent } from "@collectionify/utils"
import type { Collection } from "../utils/types"
import { Prisma } from '@prisma/client'

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

