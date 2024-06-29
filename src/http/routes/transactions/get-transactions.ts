import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"

export async function getTransactions(app: FastifyInstance) {
  app.get('/transactions', async () => { 
  
    const transactions =  await prisma.transaction.findMany() 
    
    return { transactions }
  })
}