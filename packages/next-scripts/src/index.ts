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
      break;
    }
  }

  if (!loadedFile) {
    console.warn('⚠️ No .env file loaded.');
  }
}


export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

