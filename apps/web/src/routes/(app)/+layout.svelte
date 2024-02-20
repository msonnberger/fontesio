<script lang="ts">
	import Sidebar from '$lib/features/sidebar/components/sidebar.svelte';

	export let data;
</script>

<div class="flex h-screen bg-muted p-1.5">
	<Sidebar current_pathname={data.pathname} user={data.user} />

	<div class="w-full pl-1.5">
		<main class="w-full h-full overflow-y-scroll bg-white rounded-lg p-8 shadow-md">
			<slot />
		</main>
	</div>
</div>
