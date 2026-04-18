import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		outDir: 'build',
	},
	server: {
		port: 3000,
		strictPort: true,
	},
	preview: {
		port: 8080,
	},
});
