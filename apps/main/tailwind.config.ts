import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        // Scan your app files
        './src/app/**/*.{ts,tsx,js,jsx}',
        './src/components/**/*.{ts,tsx,js,jsx}',
        '../../packages/ui/src/**/*.{ts,tsx,js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1877F2',
                secondary: '#F0F2F5',
                dark: '#242526',
            },
        },
    },
    plugins: [
    ],
};

export default config;
