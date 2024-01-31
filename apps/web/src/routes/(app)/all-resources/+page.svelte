<script lang="ts">
	import ReferencesTable from '$lib/features/references-table/components/data-table.svelte';
	import AddResourceSheet from '$lib/features/add-resource/components/sheet.svelte';

	export let data;
</script>

<div class="flex justify-between mb-6">
	<h1 class="text-3xl font-bold">All references</h1>
	<AddResourceSheet />
</div>
<ReferencesTable data={data.resources} />
