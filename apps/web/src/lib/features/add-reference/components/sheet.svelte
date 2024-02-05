<script lang="ts">
	import * as Sheet from '@fontesio/ui/primitives/sheet';
	import Form from './form.svelte';
	import type { CslType } from '@fontesio/citations/types';
	import DropdownMenu from './dropdown.svelte';
	import { sheet_open } from '../stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: $sheet_open = $page.params.id !== undefined;
</script>

<Sheet.Root
	bind:open={$sheet_open}
	onOpenChange={async (is_open) => {
		if (!is_open) {
			await goto('/all-references');
		}
	}}
>
	<DropdownMenu />
	<Sheet.Content side="right" class="min-w-[30rem]">
		<Sheet.Header>
			<Sheet.Title>Add reference</Sheet.Title>
			<Sheet.Description>Add a new reference to your collection.</Sheet.Description>
		</Sheet.Header>
		<Form />
	</Sheet.Content>
</Sheet.Root>
