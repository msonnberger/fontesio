<script lang="ts">
	import Sidebar from '$lib/features/sidebar/components/sidebar.svelte';

	export let data;
</script>

<div class="flex h-screen">
	<Sidebar current_pathname={data.pathname} user={data.user} />

	<div class="w-full">
		<main class="w-full h-full overflow-y-scroll p-8">
			<slot />
		</main>
	</div>
</div>
