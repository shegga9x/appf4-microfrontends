import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export function loadEnv() {
  const envFilesPriority = [
    `.env.${process.env.NODE_ENV}.local`,
    `.env.local`,
    `.env.${process.env.NODE_ENV}`,
    `.env`
  ];

  const rootDir = path.resolve(process.cwd(), '../../'); // monorepo root
  let loadedFile = null;

  for (const filename of envFilesPriority) {
    const fullPath = path.join(rootDir, filename);

    if (fs.existsSync(fullPath)) {
      const result = dotenv.config({ path: fullPath });

      if (result.error) {
        console.warn(`⚠️ Error loading ${filename}:`, result.error);
      } else {
        console.log(`✅ Loaded ENV variables from: ${filename}`);
        console.log(`- NEXT_PUBLIC_DOCS_URL: ${process.env.NEXT_PUBLIC_DOCS_URL ?? 'Not defined'}`);
        console.log(`- NEXT_PUBLIC_POST_URL: ${process.env.NEXT_PUBLIC_POST_URL ?? 'Not defined'}`);
        loadedFile = filename;
        break;
      }
    }
  }

  if (!loadedFile) {
    console.warn('⚠️ No .env file loaded.');
  }
}
