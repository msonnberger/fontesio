<script lang="ts">
	import * as FormPrimitive from 'formsnap';
	import { cn } from '../../lib/utils';
	import IconAlertCircle from '~icons/lucide/alert-circle';

	type $$Props = FormPrimitive.FieldErrorsProps & {
		errorClasses?: string | undefined | null;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let errorClasses: $$Props['class'] = undefined;
</script>

<FormPrimitive.FieldErrors
	class={cn('text-[0.8rem] text-destructive', className)}
	{...$$restProps}
	let:errors
	let:fieldErrorsAttrs
	let:errorAttrs
>
	<slot {errors} {fieldErrorsAttrs} {errorAttrs}>
		{#each errors as error}
			<div {...errorAttrs} class="flex items-center gap-x-2">
				<IconAlertCircle class="text-[0.7rem]" />
				<p class={cn(errorClasses)}>{error}</p>
			</div>
		{/each}
	</slot>
</FormPrimitive.FieldErrors>
