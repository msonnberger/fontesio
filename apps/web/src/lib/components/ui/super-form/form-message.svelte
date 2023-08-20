<script lang="ts">
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { FormFieldContext } from './types';
	import { FORM_FIELD_CONTEXT } from './';
	let className: string | undefined | null = undefined;
	export { className as class };

	const { formMessageId, errors } = getContext<FormFieldContext>(FORM_FIELD_CONTEXT);
</script>

{#if $errors}
	<p class={cn('text-[0.8rem] font-medium text-destructive', className)} id={formMessageId}>
		{$errors}
	</p>
{/if}
