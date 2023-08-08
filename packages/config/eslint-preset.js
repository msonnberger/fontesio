/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'turbo',
		'prettier',
	],
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
	rules: {
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				varsIgnorePattern: '\\$\\$Props',
			},
		],
		'svelte/valid-compile': [
			'error',
			{
				ignoreWarnings: true,
			},
		],
		'no-empty-pattern': [
			'error',
			{
				allowObjectPatternsAsParameters: true,
			},
		],
	},
};
