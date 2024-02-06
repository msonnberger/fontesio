<script lang="ts">
	import PlusCircle from '~icons/lucide/plus-circle';
	import { Button } from '@fontesio/ui/primitives/button';
	import * as DropdownMenu from '@fontesio/ui/primitives/dropdown-menu';
	import { unslugify } from '$lib/utils/unslugify';
	import type { CslType } from '@fontesio/citations/types';
	import { csl_types } from '@fontesio/citations/csl-json-schema';
	import IdentifierForm from './identifier-form.svelte';

	const shortcut_types: CslType[] = [
		'book',
		'article-journal',
		'article-newspaper',
		'document',
		'chapter',
	];

	const more_types = csl_types.filter((type) => !shortcut_types.includes(type));
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} class="inline-flex items-center">
			<PlusCircle class="mr-2" /> Add reference
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>From identifier</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent class="p-3" sideOffset={10}>
					<IdentifierForm />
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			{#each shortcut_types as type}
				<DropdownMenu.Item class="p-0">
					<a href="/all-references/new?type={type}" class="px-2 py-1 w-full text-left">
						{unslugify(type)}
					</a>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger class="py-1">More</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent class="h-80 w-max overflow-y-scroll">
					{#each more_types as type}
						<DropdownMenu.Item class="p-0">
							<a href="/all-references/new?type={type}" class="px-2 py-1 w-full text-left">
								{unslugify(type)}
							</a>
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
