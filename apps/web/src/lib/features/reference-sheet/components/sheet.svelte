<script lang="ts">
	import * as Sheet from '@fontesio/ui/primitives/sheet';
	import * as Tabs from '@fontesio/ui/primitives/tabs';
	import Form from './form.svelte';
	import DropdownMenu from './dropdown.svelte';
	import { sheet_open } from '../stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { format_author } from '@fontesio/citations/format-author';
	import Citation from './citation.svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';

	const tab = queryParam('tab', ssp.string('info'), { showDefaults: false });

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
		<!-- TODO: fix TS error -->
		<Tabs.Root bind:value={$tab}>
			<Tabs.List class="max-w-fit mx-auto flex">
				<Tabs.Trigger value="info">Info</Tabs.Trigger>
				<Tabs.Trigger value="cite">Cite</Tabs.Trigger>
				<Tabs.Trigger value="notes">Notes</Tabs.Trigger>
			</Tabs.List>

			<Sheet.Header class="mb-6 mt-4">
				<Sheet.Title>
					{is_new_reference ? 'Add reference' : format_author($page.data.manual_form?.data)}
				</Sheet.Title>
				<Sheet.Description>
					{is_new_reference ? 'Add a new reference to your library.' : 'Update your reference.'}
				</Sheet.Description>
			</Sheet.Header>
			<Tabs.Content value="info" class="h-[calc(100vh-240px)] overflow-y-scroll pl-[1px] pr-3">
				<Form />
			</Tabs.Content>
			<Tabs.Content value="cite">
				<Citation />
			</Tabs.Content>
		</Tabs.Root>
	</Sheet.Content>
</Sheet.Root>
