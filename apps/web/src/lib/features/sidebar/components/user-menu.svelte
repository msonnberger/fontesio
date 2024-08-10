<script lang="ts">
	import IconLogOut from '~icons/lucide/log-out';
	import IconChevronUp from '~icons/lucide/chevron-up';
	import * as DropdownMenu from '@fontesio/ui/primitives/dropdown-menu';
	import type { Session } from '@fontesio/lib/lucia/auth';

	export let user: Session['user'];
</script>

<div class="flex text-slate-600 items-center rounded-md bg-muted p-2">
	<div
		class="h-7 w-7 mr-2 text-xs text-indigo-900 font-semibold shrink-0 bg-indigo-500/50 rounded-full grid place-items-center"
	>
		{user.email.at(0)?.toUpperCase()}
	</div>
	<span class="grow text-xs overflow-x-hidden text-ellipsis">{user.email}</span>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			class="hover:bg-slate-200 rounded-md ml-1 p-0.5 transition-colors"
			id="user-menu-trigger"
		>
			<IconChevronUp />
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
