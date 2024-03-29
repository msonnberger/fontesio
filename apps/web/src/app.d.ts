import type { Reference } from '@fontesio/drizzle/schema';
import 'unplugin-icons/types/svelte';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: import('@fontesio/lib/lucia/auth').Session | null;
		}
		interface PageState {
			citation_dialog_reference: Reference | undefined;
		}
		// interface PageData {}
		// interface Platform {}
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
