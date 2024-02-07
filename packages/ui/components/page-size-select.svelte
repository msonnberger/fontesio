<script lang="ts">
	import * as Select from '../primitives/select';

	export let page_size: number;
	export let on_page_size_change: ((page_size: number | null) => void) | undefined = undefined;
</script>

<div class="flex items-center space-x-2">
	<p class="text-sm">Rows per page</p>
	<Select.Root
		selected={{ value: page_size, label: page_size.toString() }}
		onSelectedChange={(selected) => on_page_size_change?.(selected ? selected.value : null)}
	>
		<Select.Trigger class="h-8 w-[70px]">
			<Select.Value />
		</Select.Trigger>
		<Select.Content side="top">
			{#each [10, 20, 50, 100] as page_size (page_size)}
				<Select.Item value={page_size}>
					{page_size}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
