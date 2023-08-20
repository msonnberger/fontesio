<script lang="ts">
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { FormFieldContext } from './types';
	import { FORM_FIELD_CONTEXT } from './';
	let className: string | undefined | null = undefined;
	export { className as class };

	const { formDescriptionId } = getContext<FormFieldContext>(FORM_FIELD_CONTEXT);
</script>

<p
	class={cn('text-[0.8rem] text-muted-foreground', className)}
	{...$$restProps}
	id={formDescriptionId}
>
	<slot />
</p>
