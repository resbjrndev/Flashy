
import { Pool, type QueryResult, type QueryResultRow } from 'pg';

export type DeckRow = {
  id: string;
  title: string;
  description: string | null;
  created_at: Date;
  card_count: number;
};

let pool: Pool | null = null;

function parseConnectionString(connStr: string) {
  // Manual parser to avoid Next.js URL polyfill issues
  // Format: postgresql://user:password@host:port/database?params

  try {
    // Extract protocol
    const protocolMatch = connStr.match(/^(postgres(?:ql)?):\/\/(.+)$/);
    if (!protocolMatch) {
      throw new Error('Invalid protocol');
    }

    const rest = protocolMatch[2];

    // Split by @ to separate credentials from host
    const atIndex = rest.lastIndexOf('@');
    if (atIndex === -1) {
      throw new Error('Missing @ separator');
    }

    const credentials = rest.substring(0, atIndex);
    const hostPart = rest.substring(atIndex + 1);

    // Parse credentials (user:password)
    const colonIndex = credentials.indexOf(':');
    if (colonIndex === -1) {
      throw new Error('Missing password');
    }

    const user = decodeURIComponent(credentials.substring(0, colonIndex));
    const password = decodeURIComponent(credentials.substring(colonIndex + 1));

    // Parse host part (host:port/database?params or host:port?params)
    const slashIndex = hostPart.indexOf('/');
    const questionIndex = hostPart.indexOf('?');

    let hostPort: string;
    let dbPart: string;

    if (slashIndex === -1) {
      // No slash, so format is host:port or host:port?params
      if (questionIndex === -1) {
        hostPort = hostPart;
        dbPart = 'postgres'; // default database
      } else {
        hostPort = hostPart.substring(0, questionIndex);
        dbPart = 'postgres?' + hostPart.substring(questionIndex + 1);
      }
    } else {
      // Has slash, format is host:port/database?params
      hostPort = hostPart.substring(0, slashIndex);
      dbPart = hostPart.substring(slashIndex + 1);
    }

    // Parse host:port
    const portMatch = hostPort.match(/^(.+):(\d+)$/);
    if (!portMatch) {
      throw new Error('Invalid host:port format');
    }
    const host = portMatch[1];
    const port = parseInt(portMatch[2], 10);

    // Parse database and query params
    const dbQuestionIndex = dbPart.indexOf('?');
    const database = dbQuestionIndex === -1 ? dbPart : dbPart.substring(0, dbQuestionIndex);
    const queryString = dbQuestionIndex === -1 ? '' : dbPart.substring(dbQuestionIndex + 1);

    // Parse query params manually
    const params: Record<string, string> = {};
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
          params[key] = value;
        }
      });
    }

    return {
      user,
      password,
      host,
      port,
      database,
      ssl: params.sslmode === 'require' ? { rejectUnauthorized: false } : false,
      // Force IPv4 to avoid IPv6 DNS issues in some environments
      ...(process.version && { options: '-c client_encoding=UTF8' }),
    };
  } catch (e: any) {
    throw new Error(`Failed to parse DATABASE_URL: ${e.message}`);
  }
}

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const config = parseConnectionString(connectionString);
    pool = new Pool(config);
  }
  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const client = await getPool().connect();
  try {
    const result = await client.query<T>(text, params);
    return result;
  } finally {
    client.release();
  }
}
