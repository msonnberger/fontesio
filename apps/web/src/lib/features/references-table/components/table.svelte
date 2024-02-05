<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { FindResultSet } from '@fontesio/lib/types/find-result-set';
	import type { Reference } from '@fontesio/drizzle/schema';

	export let results: FindResultSet<Reference>;
</script>

<DataTable {results} />
