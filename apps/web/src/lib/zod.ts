import { z } from 'zod';

export const signup_schema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: 'Minimum 8 characters long' })
		.regex(/^(?=.*[a-z])(?=.*[A-Z]).*$/, { message: 'Mix of lowercase and uppercase letters' })
		.regex(/\d/, { message: 'Contains at least one number' }),
});

export const login_schema = z.object({
	email: z.string().email('Please enter a valid email address.'),
	password: z.string().min(1, 'This field is required.'),
});
