<script lang="ts">
	export let pathname: string;
	export let is_active: boolean;
</script>

<li aria-current={is_active ? 'page' : undefined} class="group">
	<a
		href={pathname}
		class="flex gap-3 items-center p-2 rounded-md font-[450] text-sm text-muted-foreground hover:bg-muted group-aria-[current=page]:bg-muted group-aria-[current=page]:text-foreground"
	>
		<slot />
	</a>
</li>
