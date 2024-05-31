import {PrismaClient} from '@prisma/client'

// ensure that 
// dev env --> do not create repeated Prisma client
// production env --> create new prisma client
declare global{
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }

  prisma = global.cachedPrisma
}

export const db = prisma

// or we can always create new prisma client by:
// export const db = new PrismaClient()