import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"
import z from "zod"

export async function deleteTransaction(app: FastifyInstance) {
  app.delete('/transaction/:id', async (request, reply) => {
    const getTransactionParams = z.object({
      id: z.string().uuid(),
    })
  
    const { id } = getTransactionParams.parse(request.params)
  
    await prisma.transaction.delete({
      where: { id }
    })  
    
     return reply.status(204).send()
  })
}