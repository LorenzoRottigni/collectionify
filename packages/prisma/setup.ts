import { PrismaClient } from '@prisma/client'
import { collectionifyExtension } from './extensions'

export const init = (prisma = new PrismaClient()) => prisma.$extends(collectionifyExtension)