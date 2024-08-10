<script lang="ts">
	import IconClock from '~icons/lucide/clock-2';
	import IconLibrary from '~icons/lucide/library';
	import IconStar from '~icons/lucide/star';
	import type { Session } from '@fontesio/lib/lucia/auth';
	import NavItem from './nav-item.svelte';
	import UserMenu from './user-menu.svelte';
	import Logo from './logo.svelte';

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

<aside class="flex flex-col w-[clamp(12rem,18%,20rem)] p-2 border-r">
	<Logo />
	<div class="grow mt-10">
		<nav>
			<ul class="grid gap-y-1">
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
