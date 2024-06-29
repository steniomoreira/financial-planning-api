import fastify from 'fastify'
import { getTransactions } from './routes/transactions/get-transactions';
import { getTransaction } from './routes/transactions/get-transaction';
import { createTransaction } from './routes/transactions/create-transaction';
import { updateTransaction } from './routes/transactions/update-transaction';
import { deleteTransaction } from './routes/transactions/delete-transaction';

const app = fastify()

app.register(getTransactions)
app.register(getTransaction)
app.register(createTransaction)
app.register(updateTransaction)
app.register(deleteTransaction)

app.listen({port: 3333}).then(() => {
  console.log('HTTP server running!');  
})
