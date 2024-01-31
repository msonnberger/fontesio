<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addPagination, addSortBy, addSelectedRows } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '@fontesio/ui/primitives/table';
	import DataTableActions from './data-table-actions.svelte';
	import { Button } from '@fontesio/ui/primitives/button';
	import ArrowUpDown from '~icons/lucide/arrow-up-down';
	import DataTableCheckbox from './data-table-checkbox.svelte';
	import type { Resource } from '@fontesio/lib/server-only/resources/get-all-resources-by-user-id';
	import { unslugify } from '$lib/utils/unslugify';

	export let data: Resource[];

	const table = createTable(readable(data), {
		page: addPagination({ initialPageSize: 14 }),
		sort: addSortBy(),
		select: addSelectedRows(),
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected,
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);
				return createRender(DataTableCheckbox, {
					checked: isSelected,
				});
			},
			plugins: {
				sort: {
					disable: true,
				},
			},
		}),
		table.column({
			accessor: (item) => item.csl_json.type,
			header: 'Type',
			cell: ({ value }) => unslugify(value),
		}),
		table.column({
			accessor: (item) => item.csl_json.title,
			header: 'Title',
			plugins: {
				sort: {
					disable: true,
				},
			},
		}),
		table.column({
			accessor: (item) => item.csl_json.author,
			header: 'Author',
			cell: ({ value }) => {
				if (!value) return '';

				return value.map((author) => author.literal).join(', ');
			},
			plugins: {
				sort: {
					disable: true,
				},
			},
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value });
			},
			plugins: {
				sort: {
					disable: true,
				},
			},
		}),
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, rows } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { selectedDataIds } = pluginStates.select;
</script>

<div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
										{#if cell.id === 'type'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === 'amount'}
											<div class="text-right font-medium">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'status'}
											<div class="capitalize">
												<Render of={cell.render()} />
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{Object.keys($selectedDataIds).length} of{' '}
			{$rows.length} row(s) selected.
		</div>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
