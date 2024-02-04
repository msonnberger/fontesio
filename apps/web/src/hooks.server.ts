import { lucia } from '@fontesio/lib/lucia/auth';

export async function handle({ event, resolve }) {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	// biome-ignore lint/complexity/useOptionalChain: needed for lucia, TODO: investigate why
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			...sessionCookie.attributes,
			path: '/',
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			...sessionCookie.attributes,
			path: '/',
		});
	}

	event.locals.session = session ? { ...session, user } : null;
	return resolve(event);
}
