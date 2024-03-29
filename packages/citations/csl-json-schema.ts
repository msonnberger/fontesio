import { z } from 'zod';

const csl_date_schema = z
	.object({
		'date-parts': z
			.array(z.array(z.union([z.string(), z.number()])).max(3))
			.min(1)
			.max(2)
			.optional(),
		season: z.union([z.string(), z.number()]).optional(),
		circa: z.union([z.string(), z.number(), z.boolean()]).optional(),
		literal: z.string().optional(),
		raw: z.string().optional(),
	})
	.optional();

const csl_name_schema = z.object({
	family: z.string().optional(),
	given: z.string().optional(),
	'dropping-particle': z.string().optional(),
	'non-dropping-particle': z.string().optional(),
	suffix: z.string().optional(),
	'comma-suffix': z.union([z.string(), z.number(), z.boolean()]).optional(),
	'static-ordering': z.union([z.string(), z.number(), z.boolean()]).optional(),
	literal: z.string().optional(),
	'parse-names': z.union([z.string(), z.number(), z.boolean()]).optional(),
});

const csl_names_schema = z.array(csl_name_schema);

export const csl_types = [
	'article',
	'article-journal',
	'article-magazine',
	'article-newspaper',
	'bill',
	'book',
	'broadcast',
	'chapter',
	'classic',
	'collection',
	'dataset',
	'document',
	'entry',
	'entry-dictionary',
	'entry-encyclopedia',
	'event',
	'figure',
	'graphic',
	'hearing',
	'interview',
	'legal_case',
	'legislation',
	'manuscript',
	'map',
	'motion_picture',
	'musical_score',
	'pamphlet',
	'paper-conference',
	'patent',
	'performance',
	'periodical',
	'personal_communication',
	'post',
	'post-weblog',
	'regulation',
	'report',
	'review',
	'review-book',
	'software',
	'song',
	'speech',
	'standard',
	'thesis',
	'treaty',
	'webpage',
] as const;

export const csl_name_fields = [
	'author',
	'chair',
	'collection-editor',
	'compiler',
	'composer',
	'container-author',
	'contributor',
	'curator',
	'director',
	'editor',
	'editorial-director',
	'executive-producer',
	'guest',
	'host',
	'interviewer',
	'illustrator',
	'narrator',
	'organizer',
	'original-author',
	'performer',
	'producer',
	'recipient',
	'reviewed-author',
	'script-writer',
	'series-creator',
	'translator',
] as const;

export const csl_json_schema = z.object({
	type: z.enum(csl_types),
	id: z.string().optional(),
	'citation-key': z.string().optional(),
	categories: z.array(z.string()).optional(),
	language: z.string().optional(),
	journalAbbreviation: z.string().optional(),
	shortTitle: z.string().optional(),
	author: csl_names_schema.default([{ family: undefined, given: undefined }]),
	chair: csl_names_schema.default([{ family: undefined, given: undefined }]),
	'collection-editor': csl_names_schema.default([{ family: undefined, given: undefined }]),
	compiler: csl_names_schema.default([{ family: undefined, given: undefined }]),
	composer: csl_names_schema.default([{ family: undefined, given: undefined }]),
	'container-author': csl_names_schema.default([{ family: undefined, given: undefined }]),
	contributor: csl_names_schema.default([{ family: undefined, given: undefined }]),
	curator: csl_names_schema.default([{ family: undefined, given: undefined }]),
	director: csl_names_schema.default([{ family: undefined, given: undefined }]),
	editor: csl_names_schema.default([{ family: undefined, given: undefined }]),
	'editorial-director': csl_names_schema.default([{ family: undefined, given: undefined }]),
	'executive-producer': csl_names_schema.default([{ family: undefined, given: undefined }]),
	guest: csl_names_schema.default([{ family: undefined, given: undefined }]),
	host: csl_names_schema.default([{ family: undefined, given: undefined }]),
	interviewer: csl_names_schema.default([{ family: undefined, given: undefined }]),
	illustrator: csl_names_schema.default([{ family: undefined, given: undefined }]),
	narrator: csl_names_schema.default([{ family: undefined, given: undefined }]),
	organizer: csl_names_schema.default([{ family: undefined, given: undefined }]),
	'original-author': csl_names_schema.default([{ family: undefined, given: undefined }]),
	performer: csl_names_schema.default([{ family: undefined, given: undefined }]),
	producer: csl_names_schema.default([{ family: undefined, given: undefined }]),
	recipient: csl_names_schema.default([{ family: undefined, given: undefined }]),
	'reviewed-author': csl_names_schema.default([{ family: undefined, given: undefined }]),
	'script-writer': csl_names_schema.default([{ family: undefined, given: undefined }]),
	'series-creator': csl_names_schema.default([{ family: undefined, given: undefined }]),
	translator: csl_names_schema.default([{ family: undefined, given: undefined }]),
	accessed: csl_date_schema.default({ 'date-parts': [[]] }),
	'available-date': csl_date_schema.default({ 'date-parts': [[]] }),
	'event-date': csl_date_schema.default({ 'date-parts': [[]] }),
	issued: csl_date_schema.default({ 'date-parts': [[]] }),
	'original-date': csl_date_schema.default({ 'date-parts': [[]] }),
	submitted: csl_date_schema.default({ 'date-parts': [[]] }),
	abstract: z.string().optional(),
	annote: z.string().optional(),
	archive: z.string().optional(),
	archive_collection: z.string().optional(),
	archive_location: z.string().optional(),
	'archive-place': z.string().optional(),
	authority: z.string().optional(),
	'call-number': z.string().optional(),
	'chapter-number': z.union([z.string(), z.number()]).optional(),
	'citation-number': z.union([z.string(), z.number()]).optional(),
	'citation-label': z.string().optional(),
	'collection-number': z.union([z.string(), z.number()]).optional(),
	'collection-title': z.string().optional(),
	'container-title': z.string().optional(),
	'container-title-short': z.string().optional(),
	dimensions: z.string().optional(),
	division: z.string().optional(),
	DOI: z.string().optional(),
	edition: z.union([z.string(), z.number()]).optional(),
	'event-title': z.string().optional(),
	'event-place': z.string().optional(),
	'first-reference-note-number': z.union([z.string(), z.number()]).optional(),
	genre: z.string().optional(),
	ISBN: z.string().optional(),
	ISSN: z.string().optional(),
	issue: z.union([z.string(), z.number()]).optional(),
	jurisdiction: z.string().optional(),
	keyword: z.string().optional(),
	locator: z.union([z.string(), z.number()]).optional(),
	medium: z.string().optional(),
	note: z.string().optional(),
	number: z.union([z.string(), z.number()]).optional(),
	'number-of-pages': z.union([z.string(), z.number()]).optional(),
	'number-of-volumes': z.union([z.string(), z.number()]).optional(),
	'original-publisher': z.string().optional(),
	'original-publisher-place': z.string().optional(),
	'original-title': z.string().optional(),
	page: z.union([z.string(), z.number()]).optional(),
	'page-first': z.union([z.string(), z.number()]).optional(),
	part: z.union([z.string(), z.number()]).optional(),
	'part-title': z.string().optional(),
	PMCID: z.string().optional(),
	PMID: z.string().optional(),
	printing: z.union([z.string(), z.number()]).optional(),
	publisher: z.string().optional(),
	'publisher-place': z.string().optional(),
	references: z.string().optional(),
	'reviewed-genre': z.string().optional(),
	'reviewed-title': z.string().optional(),
	scale: z.string().optional(),
	section: z.string().optional(),
	source: z.string().optional(),
	status: z.string().optional(),
	supplement: z.union([z.string(), z.number()]).optional(),
	title: z.string().optional(),
	'title-short': z.string().optional(),
	URL: z.string().optional(),
	version: z.string().optional(),
	volume: z.union([z.string(), z.number()]).optional(),
	'volume-title': z.string().optional(),
	'volume-title-short': z.string().optional(),
	'year-suffix': z.string().optional(),
	custom: z.record(z.any()).optional(),
});
