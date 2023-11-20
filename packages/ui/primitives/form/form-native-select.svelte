<script lang="ts">
	import { Form as FormPrimitive } from 'formsnap';
	import { buttonVariants } from '../button';
	import { cn } from '../../lib/utils';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import ChevronsUpDown from '~icons/lucide/chevrons-up-down';

	type $$Props = HTMLSelectAttributes;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<FormPrimitive.Select
	class={cn(
		buttonVariants({ variant: 'outline' }),
		'appearance-none bg-transparent font-normal',
		className,
	)}
	{...$$restProps}
>
	<slot />
</FormPrimitive.Select>
<ChevronsUpDown class="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
