import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadEnv(envPath = '../../../.env') {
    const resolvedPath = path.resolve(__dirname, envPath);
    const result = dotenv.config({ path: resolvedPath });

    if (result.error) {
        console.error('❌ Failed to load .env file:', result.error);
        process.exit(1);
    }

    console.log('✅ Loaded ENV variables:');
    console.log(`- NEXT_PUBLIC_DOCS_URL: ${process.env.NEXT_PUBLIC_DOCS_URL ?? 'Not defined'}`);
    console.log(`- NEXT_PUBLIC_POST_URL: ${process.env.NEXT_PUBLIC_POST_URL ?? 'Not defined'}`);
}
