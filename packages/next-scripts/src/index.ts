import dotenv from 'dotenv';
import path from 'path';

export function loadEnv() {
// Always resolve from monorepo root (project root)
const envPath = path.resolve(process.cwd(), '../../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.warn('⚠️ Could not load .env file from:', envPath);
} else {
  console.log('✅ Loaded ENV variables from:', envPath);
  console.log(`- NEXT_PUBLIC_DOCS_URL: ${process.env.NEXT_PUBLIC_DOCS_URL ?? 'Not defined'}`);
  console.log(`- NEXT_PUBLIC_POST_URL: ${process.env.NEXT_PUBLIC_POST_URL ?? 'Not defined'}`);
}
}
