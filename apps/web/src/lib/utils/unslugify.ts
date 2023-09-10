export function unslugify(slug: string): string {
	return slug
		.split(/[\W_]/g)
		.map((word) => word.charAt(0).toUpperCase().concat(word.slice(1)))
		.join(' ');
}
