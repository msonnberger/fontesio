<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { cn } from '../../lib/utils';
	import { buttonVariants, type Props, type Events } from '.';

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
	export let type: $$Props['type'] = 'button';
	export { className as class };
</script>

<ButtonPrimitive.Root
	{type}
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</ButtonPrimitive.Root>
