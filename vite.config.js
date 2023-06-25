import path from 'path';
import typescript2 from 'rollup-plugin-typescript2';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';

import pkg from './package.json';

export default defineConfig({
	plugins: [
		solidPlugin(),
		dts({
			insertTypesEntry: true,
		}),
		typescript2({
			check: false,
			include: ['src/lib/**/*.ts', 'src/lib/**/*.tsx'],
			tsconfigOverride: {
				compilerOptions: {
					outDir: 'dist',
					sourceMap: true,
					declaration: true,
					declarationMap: true,
				},
			},
			exclude: ['vite.config.ts'],
		}),
	],
	build: {
		target: 'ES2020',
		lib: {
			entry: path.resolve(__dirname, 'src/lib/index.tsx'),
			name: pkg.globalName,
			fileName: (format) => `${pkg.globalName}.${format}.js`,
			formats: ['umd', 'iife'],
		},
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.includes('style')) return `${pkg.globalName}.css`;

					return assetInfo.name ?? pkg.globalName;
				},
			},
		},
		minify: true,
	},
	resolve: {
		alias: {
			'~lib': path.resolve(__dirname, 'src', 'lib'),
		},
	},
});
