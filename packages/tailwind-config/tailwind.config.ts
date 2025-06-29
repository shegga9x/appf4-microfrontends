import { type Config } from 'tailwindcss';

const config: Config = {
    theme: {
        extend: {
            colors: {
                blue-500: '#3B82F6', // ✅ blue-500
            },
        },
    },
    plugins: [],
};

export default config;
