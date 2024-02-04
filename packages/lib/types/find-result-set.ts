export type FindResultSet<T> = {
	data: T extends Array<unknown> ? T : T[];
	count: number;
	page: number;
	per_page: number;
	total_pages: number;
};
