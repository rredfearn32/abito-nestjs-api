import { PrismaClient } from '@prisma/client';

export async function cleanDatabase(prisma: PrismaClient) {
  await prisma.streak.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
}
