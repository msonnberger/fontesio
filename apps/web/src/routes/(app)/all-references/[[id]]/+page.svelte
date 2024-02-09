<script lang="ts">
	import ReferencesTable from '$lib/features/references-table/components/data-table.svelte';
	import ReferenceSheet from '$lib/features/reference-sheet/components/sheet.svelte';
	import CitationDialog from '$lib/features/citation-dialog/components/dialog.svelte';

	export let data;
</script>

<svelte:head>
	<title>All References</title>
</svelte:head>

<div class="flex justify-between mb-6">
	<h1 class="text-3xl font-bold">All references</h1>
	<ReferenceSheet />
</div>
<ReferencesTable results={data.references} />
<CitationDialog />
