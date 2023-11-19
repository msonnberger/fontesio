<script lang="ts">
	import IconClock from '~icons/lucide/clock-2';
	import IconStar from '~icons/lucide/star';
	import IconUser from '~icons/lucide/user';
	import IconLogOut from '~icons/lucide/log-out';
	import IconLibrary from '~icons/lucide/library';
	import IconChevronRight from '~icons/lucide/chevron-right';
	import IconBooks from '~icons/icon-park-solid/bookshelf';
	import { page } from '$app/stores';
	import * as DropdownMenu from '$components/ui/dropdown-menu';
	import { onNavigate } from '$app/navigation';
	import AddResourceForm from './AddResourceForm.svelte';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	export let data;
</script>

<div class="flex h-screen bg-indigo-100 p-1.5">
	<aside class="flex flex-col w-[clamp(12rem,20%,20rem)] pt-4">
		<div class="flex gap-3 items-center px-3">
			<div class="w-6 h-6 text-indigo-500">
				<IconBooks class="w-full h-full" />
			</div>
			<span class="text-lg font-semibold text-indigo-950 tracking-wide">Fontesio</span>
		</div>

		<div class="grow mt-12 px-3">
			<nav>
				<ul class="space-y-6">
					<li aria-current={data.pathname === '/' ? 'page' : undefined}>
						<a href="/" class="flex gap-4 items-center">
							<span><IconLibrary /></span><span>All References</span>
						</a>
					</li>
					<li aria-current={data.pathname === '/recents' ? 'page' : undefined}>
						<a href="/recents" class="flex gap-4 items-center">
							<span><IconClock /></span><span>Recently Added</span>
						</a>
					</li>
					<li aria-current={$page.url.pathname === '/favorites' ? 'page' : undefined}>
						<a href="/favorites" class="flex gap-4 items-center">
							<span><IconStar /></span><span>Favorites</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>

		<div class="flex text-gray-600 items-center rounded-lg bg-indigo-50 p-1.5 shadow-md">
			<div class="h-10 w-10 mr-2 shrink-0 bg-gray-300 rounded-lg grid place-items-center">
				<IconUser />
			</div>
			<span class="grow text-xs overflow-x-hidden text-ellipsis">{data.user.email}</span>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					class="hover:bg-indigo-100/90 rounded-md ml-1 p-0.5 transition-colors"
					id="user-menu-trigger"
				>
					<IconChevronRight />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item class="p-0">
						<form action="/logout" method="post" class="w-full">
							<button type="submit" class="flex items-center w-full px-2 py-1.5">
								<IconLogOut class="w-4 h-4 mr-2" />
								Log out
							</button>
						</form>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</aside>

	<div class="w-full pl-1.5">
		<main class="w-full h-full overflow-y-scroll bg-white rounded-lg p-8 shadow-md">
			<AddResourceForm />
			<slot />
		</main>
	</div>
</div>

<style lang="postcss">
	:root {
		/* disable document-level crossfade */
		view-transition-name: none;
	}

	li[aria-current='page']::before {
		view-transition-name: indicator;
		content: '';
		@apply absolute w-[4px] h-[26px] bg-indigo-800 rounded-full -left-[1px];
	}
</style>
