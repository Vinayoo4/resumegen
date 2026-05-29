import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import notesRoutes from './routes/notes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Simple published page view
import { readJson } from './storage/db';
import { PublishedPage } from '../../shared/types';
app.get('/published/:id', async (req, res) => {
  try {
    const pages = await readJson<PublishedPage[]>('content/pages', []);
    const page = pages.find(p => p.id === req.params.id);
    if (!page) {
      return res.status(404).send('Page not found');
    }
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>${page.title}</title><style>body { font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }</style></head>
      <body>${page.content}</body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error loading page');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
