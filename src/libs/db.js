import prisma, { PrismaClient } from "../generated/prisma/index.js"

const globalForPrisma = globalThis

export const db = globalForPrisma.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production"){
    globalForPrisma.this=db
}

console.log("db connected success")