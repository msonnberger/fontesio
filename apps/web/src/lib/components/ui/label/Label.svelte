<script lang="ts">
	import { cva } from 'class-variance-authority';

	import { cn } from '$lib/utils';

	const labelVariants = cva(
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
	);

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<label
	on:mousedown={(e) => {
		if (!e.defaultPrevented && e.detail > 1) {
			e.preventDefault();
		}
	}}
	class={cn(labelVariants(), className)}
	{...$$restProps}
>
	<slot />
</label>
