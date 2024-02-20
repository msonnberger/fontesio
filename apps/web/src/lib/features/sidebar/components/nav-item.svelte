<script lang="ts">
	export let pathname: string;
	export let is_active: boolean;
</script>

<li aria-current={is_active ? 'page' : undefined} class="group">
	<a
		href={pathname}
		class="flex gap-3 items-center px-3 py-2 rounded-xl text-[0.94rem] text-muted-foreground hover:bg-gray-200 group-aria-[current=page]:bg-white group-aria-[current=page]:shadow group-aria-[current=page]:text-foreground"
	>
		<slot />
	</a>
</li>
