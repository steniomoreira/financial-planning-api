import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"
import z from "zod"

export async function getTransaction(app: FastifyInstance) {
  app.get('/transaction/:id', async (request) => {
    const getTransactionParams = z.object({
      id: z.string().uuid(),
    })
  
    const { id } = getTransactionParams.parse(request.params)
  
    const transaction = await prisma.transaction.findUnique({
      where: { id }
     })  
    
    return { transaction }
  })
}