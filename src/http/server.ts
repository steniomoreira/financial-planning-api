import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from "zod"

const app = fastify()

const prisma = new PrismaClient()

app.post('/transaction', async (request, reply) => {
  const createTransaction = z.object({
    isPaid: z.boolean(),
    dueDate: z.string().transform((str) => new Date(str)),
    description: z.string(),
    amount: z.number(),
    type: z.enum(['credit', 'debit'])
  })

  const {isPaid, dueDate, description, amount, type} = createTransaction.parse(request.body)

  await prisma.transaction.create({
    data: {isPaid, dueDate, description, amount: type === 'credit' ? amount : amount * -1 }
  })  
  
  return reply.status(201).send()
})

app.listen({port: 3333}).then(() => {
  console.log('HTTP server running!');  
})
