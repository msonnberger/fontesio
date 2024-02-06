<script lang="ts">
	import * as Pagination from '../primitives/pagination';
	import ChevronLeft from '~icons/lucide/chevron-left';
	import ChevronRight from '~icons/lucide/chevron-right';

	export let count: number;
	export let per_page: number;
	export let page: number | null;
	export let on_page_change: ((page: number) => void) | undefined = undefined;

	$: _page = page === null ? undefined : page;
</script>

<Pagination.Root
	{count}
	bind:page={_page}
	perPage={per_page}
	onPageChange={on_page_change}
	let:pages
	let:currentPage
>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton>
				<ChevronLeft class="h-4 w-4" />
			</Pagination.PrevButton>
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item>
					<Pagination.Link {page} isActive={currentPage == page.value}>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton>
				<ChevronRight class="h-4 w-4" />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
