import { sql } from '@fontesio/drizzle';
import { db } from '$lib';
import { error, text } from '@sveltejs/kit';

export async function GET() {
	try {
		await db.execute(sql`SELECT 1`);
		return text('OK');
	} catch (e) {
		error(500);
	}
}
