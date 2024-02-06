import { Cite } from '@citation-js/core';
import '@citation-js/plugin-csl';
import '@citation-js/plugin-doi';
import '@citation-js/plugin-isbn';
import '@citation-js/plugin-pubmed';

export async function csl_from_identifier(id: string) {
	const cite = await Cite.async(id);
	const csl = cite.format('data', { format: 'object' })[0];
	csl.id = undefined;

	return csl;
}
