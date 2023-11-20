<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '../../lib/utils';
	import type { InputEvents } from './';
	import { Label } from '../label';

	type $$Props = HTMLInputAttributes & {
		label?: string;
		description?: string;
	};
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let id: $$Props['id'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let description: $$Props['description'] = undefined;
	export { className as class };
</script>

<div class="grid gap-2">
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<input
		{id}
		class={cn(
			'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
			className,
		)}
		bind:value
		on:blur
		on:change
		on:click
		on:focus
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		{...$$restProps}
	/>
	{#if description}
		<p class="text-sm text-muted-foreground">{description}</p>
	{/if}
</div>
