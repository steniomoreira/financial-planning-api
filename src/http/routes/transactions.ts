import { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"
import z from "zod"

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/transactions', async () => { 
  
    const transactions =  await prisma.transaction.findMany() 
    
    return { transactions }
  })

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