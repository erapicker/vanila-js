import { resolve } from 'path';
import typescript2 from 'rollup-plugin-typescript2';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig({
	plugins: [
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
			entry: resolve(__dirname, 'src/lib/index.ts'),
			name: pkg.globalName,
			fileName: (format) => `${pkg.globalName}.${format}.js`,
			formats: ['es', 'umd', 'iife'],
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
			'~lib': resolve(__dirname, 'src', 'lib'),
		},
	},
});
