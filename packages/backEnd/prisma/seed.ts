import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      user_id: `user-${uuidv4()}`,
      email: 'use@whale.dev',
      password: 'd20c25c6963d1ed285d7f91d1889fe70',
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async e => {
    await prisma.$disconnect()
    process.exit(1)
  })
