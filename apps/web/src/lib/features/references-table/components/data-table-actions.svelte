<script lang="ts">
	import * as DropdownMenu from '@fontesio/ui/primitives/dropdown-menu';
	import { Button } from '@fontesio/ui/primitives/button';
	import MoreHorizontal from '~icons/lucide/more-horizontal';
	import type { Writable } from 'svelte/store';

	export let id: string;
	export let form_id: Writable<string | undefined>;
</script>

<DropdownMenu.Root portal="#delete-reference-form">
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative w-8 h-8 p-0">
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="w-4 h-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item>Edit</DropdownMenu.Item>
		<DropdownMenu.Item>Favorite</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="p-0">
			<button
				class="px-2 py-1 w-full text-left"
				name="id"
				value={id}
				on:click={() => ($form_id = id)}
			>
				Delete
			</button>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
