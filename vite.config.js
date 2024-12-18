import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.tsx', 'resources/css/app.css'],
            refresh: true,
        }),
        react(),
    ],
    optimizeDeps: {
        exclude: ['react-colorful'],
    },
    build: {
        outDir: 'public/build',
        manifest: 'manifest.json', // For create manifest.json in public/build
        rollupOptions: {
            input: ['resources/js/app.tsx', 'resources/js/app.css'],
        },
    },
});
