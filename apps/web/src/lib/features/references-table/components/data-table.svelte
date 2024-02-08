<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addSortBy, addSelectedRows } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import * as Table from '@fontesio/ui/primitives/table';
	import DataTableActions from './data-table-actions.svelte';
	import { Button } from '@fontesio/ui/primitives/button';
	import ArrowUpDown from '~icons/lucide/arrow-up-down';
	import DataTableCheckbox from './data-table-checkbox.svelte';
	import type { Reference } from '@fontesio/drizzle/schema';
	import { unslugify } from '$lib/utils/unslugify';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import type { FindResultSet } from '@fontesio/lib/types/find-result-set';
	import { format_author } from '@fontesio/citations/format-author';
	import Pagination from '@fontesio/ui/components/pagination.svelte';
	import PageSizeSelect from '@fontesio/ui/components/page-size-select.svelte';

	export let results: FindResultSet<Reference>;

	const page = queryParam('page', ssp.number(results.page), { showDefaults: false });
	const per_page = queryParam('per_page', ssp.number(results.per_page), { showDefaults: false });

	const table_data = writable(results.data);
	$: table_data.set(results.data);

	const table = createTable(table_data, {
		sort: addSortBy(),
		select: addSelectedRows(),
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: (_, { pluginStates }) => {
				const { allRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allRowsSelected,
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
			accessor: (item) => item.csl_json,
			header: 'Author',
			cell: ({ value }) => {
				if (!value) return '';

				return format_author(value, { with_year: false });
			},
			plugins: {
				sort: {
					disable: true,
				},
			},
		}),
		table.column({
			accessor: (item) => item,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { reference: value });
			},
			plugins: {
				sort: {
					disable: true,
				},
			},
		}),
	]);

	const { headerRows, tableAttrs, tableBodyAttrs, pluginStates, rows } =
		table.createViewModel(columns);
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
				{#each $rows as row (row.id)}
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
	<div class="flex items-center justify-between space-x-2 py-4">
		<div class="text-sm text-muted-foreground">
			{Object.keys($selectedDataIds).length} of{' '}
			{results.count} row{results.count > 1 ? 's' : ''} selected.
		</div>

		<PageSizeSelect
			page_size={results.per_page}
			on_page_size_change={(page_size) => ($per_page = page_size)}
		/>

		<Pagination
			page={results.page}
			on_page_change={(p) => ($page = p)}
			count={results.count}
			per_page={results.per_page}
		/>
	</div>
</div>
