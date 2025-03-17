import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { getEmployees, createEmployee, deleteEmployee, updateEmployee } from './routes/employeeRoutes';

dotenv.config();


const app: Express = express();
const PORT = process.env.PORT || 3000;


const prisma = new PrismaClient();


app.use(cors());
app.use(express.json());


app.get('/employees', getEmployees);
app.post('/employees', createEmployee);
app.delete('/employees/:id', deleteEmployee);
app.put('/employees', updateEmployee);


async function startServer() {
  try {

    await prisma.$connect();
    console.log('Connected to database');
    

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer()
  .catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  })
  .finally(async () => {

    await prisma.$disconnect();
  });


process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});