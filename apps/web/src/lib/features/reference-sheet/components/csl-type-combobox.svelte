<script lang="ts">
	import Check from '~icons/lucide/check';
	import ChevronsUpDown from '~icons/lucide/chevrons-up-down';
	import * as Command from '@fontesio/ui/primitives/command';
	import * as Popover from '@fontesio/ui/primitives/popover';
	import { FormControl, FormLabel } from '@fontesio/ui/primitives/form';
	import { Button } from '@fontesio/ui/primitives/button';
	import { cn } from '@fontesio/ui/lib/utils';
	import { tick } from 'svelte';
	import { csl_types } from '@fontesio/citations/csl-json-schema';
	import { unslugify } from '$lib/utils/unslugify';
	import type { CslType } from '@fontesio/citations/types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let value: CslType;

	const options = csl_types.map((type) => ({ value: type, label: unslugify(type) }));

	let open = false;

	onMount(() => {
		if (!value) {
			value = ($page.url.searchParams.get('type') ?? 'book') as CslType;
		}
	});

	$: selected_value = options.find((o) => o.value === value)?.label ?? 'Select a type...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function close_and_focus_trigger(trigger_id: string) {
		open = false;
		tick().then(() => {
			document.getElementById(trigger_id)?.focus();
		});
	}

	function update_value(new_value: string, trigger_id: string) {
		value = new_value as CslType;
		close_and_focus_trigger(trigger_id);
	}
</script>

<Popover.Root bind:open let:ids>
	<FormControl let:attrs>
		<FormLabel>Reference Type</FormLabel>
		<Popover.Trigger asChild let:builder>
			<Button
				{...attrs}
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="justify-between font-normal"
			>
				{selected_value}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>
		<input hidden {value} name={attrs.name} />
	</FormControl>

	<Popover.Content align="start" class="h-80 p-0">
		<Command.Root>
			<Command.Input placeholder="Search types..." class="h-9" />
			<Command.Empty>No type found.</Command.Empty>
			<Command.Group class="overflow-y-scroll">
				{#each options as option}
					<Command.Item
						value={option.value}
						onSelect={(current_value) => update_value(current_value, ids.trigger)}
					>
						<Check class={cn('mr-2 h-4 w-4', value !== option.value && 'text-transparent')} />
						{option.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
