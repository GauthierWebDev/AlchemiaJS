import { PrismaClient } from '@prisma/client';

const createPrisma = (prisma: PrismaClient) => {
  return prisma.$extends({
    // Add custom methods here
  });
};

export type PrismaInstance = ReturnType<typeof createPrisma>;

class Prisma {
  private static instance: PrismaInstance;

  private constructor() {}

  public static getInstance() {
    if (!Prisma.instance) {
      Prisma.instance = createPrisma(new PrismaClient());
    }

    return Prisma.instance;
  }
}

export default Prisma.getInstance();
