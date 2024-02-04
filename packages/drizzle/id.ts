import { customAlphabet } from 'nanoid';
export const nanoid = customAlphabet('123456789ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

const prefixes = {
	user: 'user',
	reference: 'ref',
	test: 'test',
	verification: 'ver',
} as const;

export function generate_id(prefix: keyof typeof prefixes): string {
	return [prefixes[prefix], nanoid(18)].join('_');
}
