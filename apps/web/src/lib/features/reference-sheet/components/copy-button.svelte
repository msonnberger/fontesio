<script lang="ts">
	import { Button } from '@fontesio/ui/primitives/button';
	import Copy from '~icons/lucide/copy';
	import Check from '~icons/lucide/check';

	export let text_to_copy: string;

	let copied = false;

	async function copy_to_clipboard() {
		await navigator.clipboard.writeText(text_to_copy);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<Button
	on:click={copy_to_clipboard}
	size="sm"
	variant="outline"
	class="transition-colors {copied ? 'bg-green-50 hover:bg-green-50' : 'bg-background'}"
>
	{#if copied}
		<Check class="mr-2" />
	{:else}
		<Copy class="mr-2" />
	{/if}
	<slot>Copy</slot>
</Button>
