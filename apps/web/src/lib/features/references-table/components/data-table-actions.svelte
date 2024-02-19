<script lang="ts">
	import * as DropdownMenu from '@fontesio/ui/primitives/dropdown-menu';
	import { Button } from '@fontesio/ui/primitives/button';
	import MoreHorizontal from '~icons/lucide/more-horizontal';
	import IconTrash from '~icons/lucide/trash-2';
	import IconPencil from '~icons/lucide/pencil';
	import IconStar from '~icons/radix-icons/star';
	import IconStarFilled from '~icons/radix-icons/star-filled';
	import IconQuote from '~icons/lucide/quote';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { Reference } from '@fontesio/drizzle/schema';

	export let reference: Reference;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative w-8 h-8 p-0">
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="w-4 h-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Group>
			<DropdownMenu.Item class="p-0">
				<a
					href="/all-references/{reference.id}?tab=cite"
					class="px-2 py-1 w-full text-left flex items-center gap-3"
				>
					<IconQuote class="w-3.5 h-3.5 text-muted-foreground" />
					Cite
				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item class="p-0">
				<form use:enhance method="post" action="?/favorite_reference">
					<button
						class="px-2 py-1 w-full text-left flex items-center gap-2.5"
						name="id"
						value={reference.id}
					>
						{#if reference.is_favorite}
							<IconStarFilled fill="#facc15" class="w-4 h-4 text-yellow-400" />
							Unfavorite
						{:else}
							<IconStar class="w-4 h-4 text-muted-foreground" />
							Favorite
						{/if}
					</button>
				</form>
			</DropdownMenu.Item>
			<DropdownMenu.Item class="p-0">
				<a
					href="/all-references/{reference.id}?tab=info"
					class="px-2 py-1 w-full text-left flex items-center gap-3"
				>
					<IconPencil class="w-3.5 h-3.5 text-muted-foreground" />
					Edit
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="p-0">
			<form use:enhance method="post" action="?/delete_reference">
				<button
					class="px-2 py-1 w-full text-left flex items-center gap-3"
					name="id"
					value={reference.id}
				>
					<IconTrash class="w-3.5 h-3.5 text-muted-foreground" />
					Delete
				</button>
			</form>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
