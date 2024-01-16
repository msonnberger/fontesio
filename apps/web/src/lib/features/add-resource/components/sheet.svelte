<script lang="ts">
	import * as Sheet from '@fontesio/ui/primitives/sheet';
	import Form from './Form.svelte';
	import { page } from '$app/stores';
	import type { CslType } from '@fontesio/citations/types';
	import OpenSheetMenu from '$lib/features/add-resource/components/open-sheet-menu.svelte';

	let sheet_open = false;
	let selected_type: CslType;

	function set_selected(type: string) {
		selected_type = type as CslType;
	}
</script>

<Sheet.Root bind:open={sheet_open}>
	<OpenSheetMenu {set_selected} />
	<Sheet.Content side="right" class="min-w-[40rem]">
		<Sheet.Header>
			<Sheet.Title>Add resource</Sheet.Title>
			<Sheet.Description>Add a new resource to your collection.</Sheet.Description>
		</Sheet.Header>
		<Form initial_type={selected_type} bind:sheet_open form={$page.data.form} />
	</Sheet.Content>
</Sheet.Root>
