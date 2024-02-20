<script lang="ts">
	import IconUser from '~icons/lucide/user';
	import IconLogOut from '~icons/lucide/log-out';
	import IconChevronRight from '~icons/lucide/chevron-right';
	import * as DropdownMenu from '@fontesio/ui/primitives/dropdown-menu';
	import type { Session } from '@fontesio/lib/lucia/auth';

	export let user: Session['user'];
</script>

<div class="flex text-slate-600 items-center rounded-lg bg-slate-50 p-1.5 shadow-md">
	<div class="h-10 w-10 mr-2 shrink-0 bg-slate-300 rounded-lg grid place-items-center">
		<IconUser />
	</div>
	<span class="grow text-xs overflow-x-hidden text-ellipsis">{user.email}</span>
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
