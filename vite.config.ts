import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		outDir: 'build',
	},
	resolve: {
		alias: {
			'@/shared': '/src/shared',
			'@/entities': '/src/entities',
			'@/features': '/src/features',
			'@/widgets': '/src/widgets',
			'@/pages': '/src/pages',
			'@/app': '/src/app',
		},
	},
	server: {
		port: 3000,
		strictPort: true,
	},
	preview: {
		port: 8080,
	},
});
