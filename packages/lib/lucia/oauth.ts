import { Google } from 'arctic';
import { parseJWT } from 'oslo/jwt';

export {
	OAuth2RequestError,
	generateState as generate_state,
	generateCodeVerifier as generate_code_verifier,
} from 'arctic';

interface GoogleAuthOptions {
	webapp_url: string;
	client_id: string;
	client_secret: string;
}

export function create_google_auth({ webapp_url, client_id, client_secret }: GoogleAuthOptions) {
	return new Google(
		client_id,
		client_secret,
		`${webapp_url}/login/google/callback`,
		//scope: ['https://www.googleapis.com/auth/userinfo.email'],
	);
}

export function get_provider_user(open_id_token: string) {
	return parseJWT(open_id_token)?.payload as GoogleUser;
}

export const is_valid_oauth_provider = (provider: string) => ['google'].includes(provider);

interface GoogleUser {
	aud: string;
	exp: number;
	iat: number;
	iss: string;
	sub: string;
	at_hash?: string;
	azp?: string;
	email: string;
	email_verified: boolean;
	family_name?: string;
	given_name?: string;
	hd?: string;
	locale?: string;
	name?: string;
	nonce?: string;
	picture?: string;
	profile?: string;
}
