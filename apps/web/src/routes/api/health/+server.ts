import { sql } from '@fontesio/drizzle';
import { error, text } from '@sveltejs/kit';

export async function GET() {
	try {
		await sql`SELECT 1`;
		return text('OK');
	} catch (e) {
		error(500);
	}
}
