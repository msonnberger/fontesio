import type { CslJsonForm, CslJsonResource } from '@fontesio/citations/types';
import { db } from '@fontesio/drizzle';
import { resources } from '@fontesio/drizzle/schema';
import { generate_uuid_v7 } from '@fontesio/drizzle/uuid';

interface CreateResourceOptions {
	user_id: string;
	csl_json_form: CslJsonForm;
}

export async function create_resource({ user_id, csl_json_form }: CreateResourceOptions) {
	const csl_json = transform_csl_form_data(csl_json_form);

	return db.insert(resources).values({ user_id, csl_json }).returning();
}

function transform_csl_form_data(data: CslJsonForm): CslJsonResource {
	return {
		...data,
		id: generate_uuid_v7(),
		author: transform_names(data.author ? [data.author] : undefined),
		chair: transform_names(data.chair),
		'collection-editor': transform_names(data['collection-editor']),
		compiler: transform_names(data.compiler),
		composer: transform_names(data.composer),
		'container-author': transform_names(data['container-author']),
		contributor: transform_names(data.contributor),
		curator: transform_names(data.curator),
		director: transform_names(data.director),
		editor: transform_names(data.editor),
		'editorial-director': transform_names(data['editorial-director']),
		'executive-producer': transform_names(data['executive-producer']),
		guest: transform_names(data.guest),
		host: transform_names(data.host),
		interviewer: transform_names(data.interviewer),
		illustrator: transform_names(data.illustrator),
		narrator: transform_names(data.narrator),
		organizer: transform_names(data.organizer),
		'original-author': transform_names(data['original-author']),
		performer: transform_names(data.performer),
		producer: transform_names(data.producer),
		recipient: transform_names(data.recipient),
		'reviewed-author': transform_names(data['reviewed-author']),
		'script-writer': transform_names(data['script-writer']),
		'series-creator': transform_names(data['series-creator']),
		translator: transform_names(data.translator),
		accessed: transform_date(data.accessed),
		'available-date': transform_date(data['available-date']),
		'event-date': transform_date(data['event-date']),
		issued: transform_date(data.issued),
		'original-date': transform_date(data['original-date']),
		submitted: transform_date(data.submitted),
	};
}

function transform_names(names: CslJsonForm['chair']): CslJsonResource['chair'] {
	return names?.map((name) => ({ literal: name }));
}

function transform_date(date: CslJsonForm['accessed']): CslJsonResource['accessed'] {
	return { literal: date?.toISOString() };
}
