import 'dotenv/config';

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

export const config = {
  port: Number(process.env.SERVER_PORT) || 3001,
  db: {
    user: requireEnv('DB_USER'),
    password: requireEnv('DB_PASSWORD'),
    host: requireEnv('DB_HOST'),
    port: Number(requireEnv('DB_PORT')),
    database: requireEnv('DB_NAME'),
  },
};
