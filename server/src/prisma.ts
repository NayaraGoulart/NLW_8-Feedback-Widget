import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ['query'], // Var colocar no console os logs das queries
});