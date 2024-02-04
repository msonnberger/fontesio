<script lang="ts">
	import * as Sheet from '@fontesio/ui/primitives/sheet';
	import Form from './form.svelte';
	import type { CslType } from '@fontesio/citations/types';
	import DropdownMenu from './dropdown.svelte';

	let sheet_open = false;
	let selected_type: CslType;

	function set_selected(type: string) {
		selected_type = type as CslType;
	}
</script>

<Sheet.Root bind:open={sheet_open}>
	<DropdownMenu {set_selected} />
	<Sheet.Content side="right" class="min-w-[30rem]">
		<Sheet.Header>
			<Sheet.Title>Add reference</Sheet.Title>
			<Sheet.Description>Add a new reference to your collection.</Sheet.Description>
		</Sheet.Header>
		<Form initial_type={selected_type} bind:sheet_open />
	</Sheet.Content>
</Sheet.Root>
