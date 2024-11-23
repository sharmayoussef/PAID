import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer as createViteServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

// In-memory storage for clients
const clients = new Map();

const app = express();
app.use(express.json());

// API Routes
app.get('/api/clients', (req, res) => {
  const clientsArray = Array.from(clients.entries()).map(([id, data]) => ({
    id,
    ...data
  }));
  res.json(clientsArray);
});

app.get('/api/clients/:clientId', (req, res) => {
  const client = clients.get(req.params.clientId);
  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }
  res.json(client);
});

app.post('/api/clients', (req, res) => {
  const { name, downloadLink } = req.body;
  if (!name || !downloadLink) {
    return res.status(400).json({ error: 'Name and download link are required' });
  }
  clients.set(name, { name, downloadLink });
  res.status(201).json({ name, downloadLink });
});

app.put('/api/clients/:clientId', (req, res) => {
  const { name, downloadLink } = req.body;
  if (!clients.has(req.params.clientId)) {
    return res.status(404).json({ error: 'Client not found' });
  }
  clients.set(req.params.clientId, { name, downloadLink });
  res.json({ name, downloadLink });
});

app.delete('/api/clients/:clientId', (req, res) => {
  if (!clients.has(req.params.clientId)) {
    return res.status(404).json({ error: 'Client not found' });
  }
  clients.delete(req.params.clientId);
  res.status(204).send();
});

// Vite Dev Server Integration
async function createDevServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);

  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '../dist')));
    app.get('*', (req, res) => {
      res.sendFile(join(__dirname, '../dist/index.html'));
    });
  }

  const port = process.env.PORT || 5173;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

createDevServer();