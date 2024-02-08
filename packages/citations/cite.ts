import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';
import type { CslJsonReference } from './types';

interface CiteOptions {
	type: 'bibliography' | 'citation' | 'bibtex';
	style?: 'apa' | 'vancouver' | 'harvard1' | string;
}

export function cite(reference: CslJsonReference, options?: CiteOptions): string {
	const { type, style } = options || {};
	const cite = new Cite(reference);
	let citation: string;

	if (type === 'bibtex') {
		citation = cite.format('bibtex') as string;
	} else {
		citation = cite.format(type, { format: 'text', template: style }) as string;
	}

	return citation;
}
