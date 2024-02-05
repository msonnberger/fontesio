<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import DataTable from './data-table.svelte';
	import { page } from '$app/stores';
	import type { FindResultSet } from '@fontesio/lib/types/find-result-set';
	import type { Reference } from '@fontesio/drizzle/schema';

	export let results: FindResultSet<Reference>;

	const { enhance, formId } = superForm($page.data.delete_form);
</script>

<form use:enhance id="delete-reference-form" method="post" action="?/delete_reference">
	<DataTable {results} form_id={formId} />
</form>
