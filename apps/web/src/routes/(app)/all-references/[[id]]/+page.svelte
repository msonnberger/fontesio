<script lang="ts">
	import ReferencesTable from '$lib/features/references-table/components/table.svelte';
	import AddReferenceSheet from '$lib/features/add-reference/components/sheet.svelte';
	import { page } from '$app/stores';

	export let data;
</script>

<div class="flex justify-between mb-6">
	<h1 class="text-3xl font-bold">All references</h1>
	<AddReferenceSheet />
</div>
<ReferencesTable results={data.references} />

{#if $page.params.id}
	{$page.params.id}
{/if}
