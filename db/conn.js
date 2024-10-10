import dotenv from 'dotenv';
dotenv.config({ path: './db/.env'});

import http from 'http';
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não foi definida. Verifique o arquivo .env.");
}

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

