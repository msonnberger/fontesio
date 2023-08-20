<script lang="ts">
	import { Label } from '$components/ui/label';
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { FormFieldContext } from './types';
	import { FORM_FIELD_CONTEXT } from './';
	let className: string | undefined | null = undefined;
	export { className as class };

	const { formItemId, errors } = getContext<FormFieldContext>(FORM_FIELD_CONTEXT);
</script>

<Label class={cn($errors && 'text-destructive', className)} for={formItemId}>
	<slot />
</Label>
