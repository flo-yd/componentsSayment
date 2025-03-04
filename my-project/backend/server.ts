import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3002;

const router: Router = Router();

app.use(cors());
app.use(express.json());

// Route to toggle isOpen

router.put('/api/toggle/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isOpen } = req.body;

  try {
    // Update the isOpen field
    const updatedToggle = await prisma.toggle.update({
      where: { id: Number(id) },
      data: { isOpen },
    });

    res.status(200).json(updatedToggle);
  } catch {
    res.status(500).json({ error: 'Failed to update toggle' });
  }
});

// Route to fetch all toggles
router.get('/toggles', async (req: Request, res: Response) => {
  try {
    const toggles = await prisma.toggle.findMany();
    res.status(200).json(toggles);
  } catch {
    res.status(500).json({ error: 'Failed to fetch toggles' });
  }
});

app.use("/floyd", router)

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});