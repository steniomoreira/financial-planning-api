import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"
import z from "zod"

export async function updateTransaction(app: FastifyInstance) {
  app.put('/transaction', async (request, reply) => {
    const updateTransactionBody = z.object({
      id: z.string().uuid(),
      isPaid: z.boolean(),
      dueDate: z.string().transform((str) => new Date(str)),
      description: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })
  
    const { id, isPaid, dueDate, description, amount, type } = updateTransactionBody.parse(request.body)
  
    await prisma.transaction.update({
      where: { id },      
      data: {isPaid, dueDate, description, amount: type === 'credit' ? amount : amount * -1, updatedAt: new Date() }      
    })  
    
    return reply.status(204).send()
  })
}