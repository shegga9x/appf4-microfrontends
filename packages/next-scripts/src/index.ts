import dotenv from 'dotenv';
import path from 'path';

export function loadEnv() {
  const envFilesPriority = [
    `.env.${process.env.NODE_ENV}.local`,
    `.env.local`,
    `.env.${process.env.NODE_ENV}`,
    `.env`,
  ];

  const rootDir = path.resolve(process.cwd(), '../../'); // monorepo root
  let loadedFile: string | null = null;

  for (const filename of envFilesPriority) {
    const fullPath = path.join(rootDir, filename);
    const result = dotenv.config({ path: fullPath });

    if (!result.error) {
      loadedFile = filename;
      console.log(`✅ Loaded ENV variables from: ${filename}`);
      console.log(`- NEXT_PUBLIC_GATEWAY_URL: ${process.env.BACKEND_URL ?? 'Not defined'}`);
      console.log(`- SERVICE_PATH_MSFEED: ${process.env.SERVICE_PATH_MSFEED ?? 'Not defined'}`);
      break;
    }
  }

  if (!loadedFile) {
    console.warn('⚠️ No .env file loaded.');
  }
}
