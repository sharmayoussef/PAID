import { Handler } from '@netlify/functions';

// Using a more robust storage solution with proper typing
interface ClientData {
  name: string;
  downloadLink: string;
}

class ClientStore {
  private static instance: ClientStore;
  private store: Map<string, ClientData>;

  private constructor() {
    this.store = new Map();
  }

  static getInstance(): ClientStore {
    if (!ClientStore.instance) {
      ClientStore.instance = new ClientStore();
    }
    return ClientStore.instance;
  }

  getAll(): Array<{ id: string } & ClientData> {
    return Array.from(this.store.entries()).map(([id, data]) => ({
      id,
      ...data
    }));
  }

  get(id: string): ClientData | undefined {
    return this.store.get(id);
  }

  set(id: string, data: ClientData): void {
    this.store.set(id, data);
  }

  has(id: string): boolean {
    return this.store.has(id);
  }

  delete(id: string): boolean {
    return this.store.delete(id);
  }
}

const clientStore = ClientStore.getInstance();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

const handler: Handler = async (event) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api/', '');
    const segments = path.split('/');
    const method = event.httpMethod;

    // GET /api/clients
    if (method === 'GET' && segments[0] === 'clients' && !segments[1]) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(clientStore.getAll())
      };
    }

    // GET /api/clients/:clientId
    if (method === 'GET' && segments[0] === 'clients' && segments[1]) {
      const client = clientStore.get(segments[1]);
      if (!client) {
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Client not found' })
        };
      }
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(client)
      };
    }

    // POST /api/clients
    if (method === 'POST' && segments[0] === 'clients') {
      let body: { name?: string; downloadLink?: string };
      try {
        body = JSON.parse(event.body || '{}');
      } catch {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Invalid request body' })
        };
      }

      const { name, downloadLink } = body;

      if (!name?.trim() || !downloadLink?.trim()) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Name and download link are required' })
        };
      }

      const trimmedName = name.trim();
      const trimmedLink = downloadLink.trim();

      if (clientStore.has(trimmedName)) {
        return {
          statusCode: 409,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Client with this name already exists' })
        };
      }

      try {
        new URL(trimmedLink);
      } catch {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Invalid download link URL' })
        };
      }

      clientStore.set(trimmedName, { name: trimmedName, downloadLink: trimmedLink });
      
      return {
        statusCode: 201,
        headers: corsHeaders,
        body: JSON.stringify({ name: trimmedName, downloadLink: trimmedLink })
      };
    }

    // PUT /api/clients/:clientId
    if (method === 'PUT' && segments[0] === 'clients' && segments[1]) {
      let body: { name?: string; downloadLink?: string };
      try {
        body = JSON.parse(event.body || '{}');
      } catch {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Invalid request body' })
        };
      }

      const { name, downloadLink } = body;

      if (!name?.trim() || !downloadLink?.trim()) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Name and download link are required' })
        };
      }

      if (!clientStore.has(segments[1])) {
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Client not found' })
        };
      }

      const trimmedName = name.trim();
      const trimmedLink = downloadLink.trim();

      try {
        new URL(trimmedLink);
      } catch {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Invalid download link URL' })
        };
      }

      clientStore.set(segments[1], { name: trimmedName, downloadLink: trimmedLink });
      
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ name: trimmedName, downloadLink: trimmedLink })
      };
    }

    // DELETE /api/clients/:clientId
    if (method === 'DELETE' && segments[0] === 'clients' && segments[1]) {
      if (!clientStore.has(segments[1])) {
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Client not found' })
        };
      }

      clientStore.delete(segments[1]);
      
      return {
        statusCode: 204,
        headers: corsHeaders
      };
    }

    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Endpoint not found' })
    };
  } catch (error) {
    console.error('Server error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

export { handler };