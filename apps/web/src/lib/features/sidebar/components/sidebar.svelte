<script lang="ts">
	import IconClock from '~icons/lucide/clock-2';
	import IconLibrary from '~icons/lucide/library';
	import IconStar from '~icons/lucide/star';
	import IconBooks from '~icons/icon-park-solid/bookshelf';
	import type { Session } from '@fontesio/lib/lucia/auth';
	import NavItem from './nav-item.svelte';
	import UserMenu from './user-menu.svelte';

	export let current_pathname: string;
	export let user: Session['user'];

	const nav_items = [
		{
			pathname: '/all-references',
			icon: IconLibrary,
			label: 'All References',
		},
		{
			pathname: '/recents',
			icon: IconClock,
			label: 'Recently Added',
		},
		{
			pathname: '/favorites',
			icon: IconStar,
			label: 'Favorites',
		},
	];
</script>

<aside class="flex flex-col w-[clamp(12rem,20%,20rem)] pt-4">
	<div class="flex gap-3 items-center px-3">
		<div class="w-6 h-6 text-indigo-500">
			<IconBooks class="w-full h-full" />
		</div>
		<span class="text-lg font-semibold text-indigo-950 tracking-wide">Fontesio</span>
	</div>

	<div class="grow mt-12 px-1">
		<nav>
			<ul class="grid gap-y-2">
				{#each nav_items as { pathname, icon, label } (pathname)}
					<NavItem {pathname} is_active={current_pathname === pathname}>
						<svelte:component this={icon} />
						<span>{label}</span>
					</NavItem>
				{/each}
			</ul>
		</nav>
	</div>

	<UserMenu {user} />
</aside>
