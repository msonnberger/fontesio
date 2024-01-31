<script lang="ts">
	import { Checkbox } from '@fontesio/ui/primitives/checkbox';
	import type { Writable } from 'svelte/store';
	export let checked: Writable<boolean>;
</script>

<Checkbox bind:checked={$checked} />
