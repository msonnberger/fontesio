<script lang="ts">
	import * as Form from '@fontesio/ui/primitives/form';
	import { Button } from '@fontesio/ui/primitives/button';
	import type { FieldProps } from 'formsnap';
	import type { SuperForm } from 'sveltekit-superforms/client';
	import PlusCircle from '~icons/lucide/plus-circle';
	import type { AnyZodObject } from 'zod';
	import X from '~icons/lucide/x';
	import { tick } from 'svelte';

	export let config: FieldProps['config'];
	export let name: FieldProps['name'];
	export let form: SuperForm<AnyZodObject>['form'];
	export let label: string;

	function add_name() {
		$form[name] = [
			...$form[name],
			$form[name].at(-1)?.family ? { family: null, given: null } : { literal: null },
		];
		tick().then(() => {
			const inputs = [...document.querySelectorAll<HTMLInputElement>(`input[name^='${name}']`)];

			if ('family' in $form[name].at(-1)) {
				inputs.at(-2)?.focus();
			} else {
				inputs.at(-1)?.focus();
			}
		});
	}

	const MAX_NAMES_SHOWN = 5;
	let collapsed = $form[name].length > MAX_NAMES_SHOWN;
	$: names = collapsed ? $form[name].slice(0, MAX_NAMES_SHOWN) : $form[name];
</script>

<div class="grid grid-cols-2 gap-x-1 gap-y-2 mt-2">
	{#each names as _, i (i)}
		{#if 'family' in names[i]}
			<div class="col-span-2 grid grid-cols-subgrid gap-y-2">
				<Form.Field {config} name="{name}[{i}].family">
					{#if i === 0}
						<Form.Label class="col-span-2">{label}</Form.Label>
						<Form.Description class="col-span-2">
							Last name and first name of the {label.toLowerCase()}
						</Form.Description>
					{/if}
					<div>
						<Form.Input placeholder="Smith" />
						<Form.Validation />
					</div>
				</Form.Field>
				<Form.Field {config} name="{name}[{i}].given">
					<div>
						<div class="flex items-center gap-1">
							<Form.Input placeholder="John" />
							<Button
								size="icon"
								variant="ghost"
								on:click={() => {
									$form[name].splice(i, 1);
									$form[name] = $form[name];
								}}
							>
								<X />
							</Button>
						</div>
						<Form.Validation />
					</div>
				</Form.Field>
			</div>
		{:else}
			<div class="col-span-2 space-y-2">
				<Form.Field {config} name="{name}[{i}].literal">
					{#if i === 0}
						<Form.Label>{label}</Form.Label>
						<Form.Description>
							Last name and first name of the {label.toLowerCase()}
						</Form.Description>
					{/if}
					<div>
						<div class="flex items-center gap-1">
							<div class="grow">
								<Form.Input placeholder="John Smith" />
							</div>
							<Button
								size="icon"
								variant="ghost"
								on:click={() => {
									$form[name].splice(i, 1);
									$form[name] = $form[name];
								}}
							>
								<X />
							</Button>
						</div>
						<Form.Validation />
					</div>
				</Form.Field>
			</div>
		{/if}
	{/each}
</div>
<Button
	class="self-start"
	variant="secondary"
	size="sm"
	type="button"
	on:click={() => (collapsed ? (collapsed = false) : add_name())}
>
	{#if !collapsed}
		<PlusCircle class="mr-2" />
	{/if}
	{collapsed
		? `Show ${$form[name].length - MAX_NAMES_SHOWN} more...`
		: `Add another ${label.toLowerCase()}`}
</Button>
