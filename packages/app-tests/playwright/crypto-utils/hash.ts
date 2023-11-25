// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { scrypt } from './scrypt';

const DEFAULT_ALPHABET = 'abcdefghijklmnopqrstuvwxyz1234567890';

const generateRandomString = (length: number, alphabet: string = DEFAULT_ALPHABET) => {
	const randomUint32Values = new Uint32Array(length);
	crypto.getRandomValues(randomUint32Values);
	const u32Max = 0xffffffff;
	let result = '';
	for (let i = 0; i < randomUint32Values.length; i++) {
		const rand = randomUint32Values[i] / (u32Max + 1);
		result += alphabet[Math.floor(alphabet.length * rand)];
	}
	return result;
};

export const generateScryptHash = async (s: string): Promise<string> => {
	const salt = generateRandomString(16);
	const key = await hashWithScrypt(s.normalize('NFKC'), salt);
	return `s2:${salt}:${key}`;
};

const hashWithScrypt = async (s: string, salt: string, blockSize = 16): Promise<string> => {
	const keyUint8Array = await scrypt(new TextEncoder().encode(s), new TextEncoder().encode(salt), {
		N: 16384,
		r: blockSize,
		p: 1,
		dkLen: 64,
	});
	return convertUint8ArrayToHex(keyUint8Array);
};

const convertUint8ArrayToHex = (arr: Uint8Array): string => {
	return [...arr].map((x) => x.toString(16).padStart(2, '0')).join('');
};
