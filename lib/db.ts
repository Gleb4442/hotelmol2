import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@/shared/schema";

neonConfig.webSocketConstructor = ws;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.warn("DATABASE_URL is not set. Database features will be unavailable during build.");
}

export const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;
export const db = (pool && databaseUrl) ? drizzle({ client: pool, schema }) : (null as any);
