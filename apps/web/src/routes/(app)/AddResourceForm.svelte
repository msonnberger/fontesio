<script lang="ts">
	import type { SelectOption } from '@melt-ui/svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { unslugify } from '$lib/utils/unslugify';
	import { csl_types } from '$lib/citations/schema';
	import PlusCircle from '~icons/lucide/plus-circle';
	import Form from './Form.svelte';
	import { page } from '$app/stores';

	const shortcut_types = ['book', 'article-journal', 'article-newspaper', 'document', 'chapter'];
	const more_types = csl_types.filter((type) => !shortcut_types.includes(type));
	const set_selected = (type: string) => (selected = { value: type, label: unslugify(type) });
	let sheet_open = false;
	let selected: SelectOption<string> | undefined;
</script>

<Sheet.Root bind:open={sheet_open}>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button builders={[builder]} class="inline-flex items-center">
				<PlusCircle class="mr-2" /> Add resource
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				{#each shortcut_types as type}
					<DropdownMenu.Item class="p-0">
						<Sheet.Trigger class="px-2 py-1 w-full text-left" on:click={() => set_selected(type)}>
							{unslugify(type)}
						</Sheet.Trigger>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger class="py-1">More</DropdownMenu.SubTrigger>
					<DropdownMenu.SubContent class="overflow-y-scroll">
						{#each more_types as type}
							<DropdownMenu.Item class="p-0">
								<Sheet.Trigger
									class="px-2 py-1 w-full text-left"
									on:click={() => set_selected(type)}
								>
									{unslugify(type)}
								</Sheet.Trigger>
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.SubContent>
				</DropdownMenu.Sub>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Add resource</Sheet.Title>
			<Sheet.Description>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</Sheet.Description>
		</Sheet.Header>

		<Form bind:selected form={$page.data.form} />
	</Sheet.Content>
</Sheet.Root>
