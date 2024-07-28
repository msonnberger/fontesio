import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { HttpError } from '../errors/http-error';

interface CreateLimiterOptions {
	redis_url: string;
	redis_token: string;
}

export function create_limiter({ redis_url, redis_token }: CreateLimiterOptions) {
	const redis = new Redis({
		url: redis_url,
		token: redis_token,
	});

	const limiter = new Ratelimit({
		redis,
		analytics: true,
		prefix: 'ratelimit',
		limiter: Ratelimit.slidingWindow(10, '60s'),
	});

	interface CheckRatelimitAndThrowOptions {
		identifier: string;
	}

	async function check_ratelimit_and_throw({ identifier }: CheckRatelimitAndThrowOptions) {
		const { remaining, reset } = await limiter.limit(identifier);

		if (remaining < 1) {
			const seconds_to_wait = Math.floor((reset - Date.now()) / 1000);

			throw new HttpError({
				status: 429,
				code: 'TOO_MANY_REQUESTS',
				message: `Rate limit exceeded. Try again in ${seconds_to_wait} seconds.`,
			});
		}
	}

	return {
		check_ratelimit_and_throw,
	};
}
