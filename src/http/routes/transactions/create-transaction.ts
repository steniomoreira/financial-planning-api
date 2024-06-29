import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"
import z from "zod"

export async function createTransaction(app: FastifyInstance) {
  app.post('/transaction', async (request, reply) => {
    const createTransactionBody = z.object({
      isPaid: z.boolean(),
      dueDate: z.string().transform((str) => new Date(str)),
      description: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })
  
    const {isPaid, dueDate, description, amount, type} = createTransactionBody.parse(request.body)
  
    await prisma.transaction.create({
      data: {isPaid, dueDate, description, amount: type === 'credit' ? amount : amount * -1 }
    })  
    
    return reply.status(201).send()
  })

}