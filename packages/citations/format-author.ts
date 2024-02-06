import type { CslJsonReference } from './types';
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-csl';

interface FormatAuthorOptions {
	with_year?: boolean;
}

export function format_author(reference: CslJsonReference, options?: FormatAuthorOptions): string {
	const { with_year = true } = options || {};
	const cite = new Cite(reference);
	const citation = cite.format('citation', { format: 'text' }) as string;

	return citation.slice(1, with_year ? -1 : citation.lastIndexOf(', '));
}
