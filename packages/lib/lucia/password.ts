import { LegacyScrypt } from 'lucia';

const argon2id = new LegacyScrypt();

export const hash_password = argon2id.hash;

export const verify_password = argon2id.verify;
