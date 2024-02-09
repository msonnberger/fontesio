<script lang="ts">
	import * as Sheet from '@fontesio/ui/primitives/sheet';
	import Form from './form.svelte';
	import DropdownMenu from './dropdown.svelte';
	import { sheet_open } from '../stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { format_author } from '@fontesio/citations/format-author';

	$: $sheet_open = $page.params.id !== undefined;
	$: is_new_reference = $page.params.id === 'new';
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
			<Sheet.Title>
				{is_new_reference ? 'Add reference' : format_author($page.data.manual_form?.data)}
			</Sheet.Title>
			<Sheet.Description>
				{is_new_reference ? 'Add a new reference to your library.' : 'Update your reference.'}
			</Sheet.Description>
		</Sheet.Header>
		<Form />
	</Sheet.Content>
</Sheet.Root>
