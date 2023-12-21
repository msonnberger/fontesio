import 'unplugin-icons/types/svelte';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('@fontesio/lib/lucia/auth').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}

	namespace Lucia {
		type Auth = import('@fontesio/lib/lucia/auth').Auth;
		type DatabaseUserAttributes = {
			email: string;
			email_verified: boolean;
		};
		type DatabaseSessionAttributes = unknown;
	}

	// TODO: remove when types are updated
	interface ViewTransition {
		updateCallbackDone: Promise<void>;
		ready: Promise<void>;
		finished: Promise<void>;
		skipTransition: () => void;
	}

	interface Document {
		startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
	}
}
