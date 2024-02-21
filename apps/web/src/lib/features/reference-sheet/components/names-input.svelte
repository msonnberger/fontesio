<script lang="ts">
	import * as Form from '@fontesio/ui/primitives/form';
	import { Button } from '@fontesio/ui/primitives/button';
	import type { SuperForm, Infer } from 'sveltekit-superforms';
	import PlusCircle from '~icons/lucide/plus-circle';
	import X from '~icons/lucide/x';
	import { tick } from 'svelte';
	import { Input } from '@fontesio/ui/primitives/input';
	import type { CslJsonSchema } from '@fontesio/citations/types';

	export let name: 'author';
	export let form: SuperForm<Infer<CslJsonSchema>>;
	export let label: string;

	$: form_data = form.form;

	function add_name() {
		$form_data[name] = [
			...$form_data[name],
			$form_data[name].at(-1)?.family ? { family: null, given: null } : { literal: null },
		];
		tick().then(() => {
			const inputs = [...document.querySelectorAll<HTMLInputElement>(`input[name^='${name}']`)];

			if ('family' in $form_data[name].at(-1)) {
				inputs.at(-2)?.focus();
			} else {
				inputs.at(-1)?.focus();
			}
		});
	}

	const MAX_NAMES_SHOWN = 5;
	$: collapsed = $form_data[name].length > MAX_NAMES_SHOWN;
	$: names = collapsed ? $form_data[name].slice(0, MAX_NAMES_SHOWN) : $form_data[name];
</script>

<Form.Fieldset {form} {name}>
	<Form.Legend class="col-span-2">{label}</Form.Legend>
	<Form.Description class="col-span-2">
		Last name and first name of the {label.toLowerCase()}
	</Form.Description>
	<div class="grid grid-cols-2 gap-x-1 gap-y-2 mt-2">
		{#each names as _, i (i)}
			{#if 'family' in names[i]}
				<div class="col-span-2 grid grid-cols-subgrid gap-y-2">
					<Form.ElementField {form} name="{name}[{i}].family">
						<div>
							<Form.Control let:attrs>
								<Input {...attrs} placeholder="Smith" bind:value={$form_data[name][i].family} />
							</Form.Control>
							<Form.FieldErrors />
						</div>
					</Form.ElementField>
					<Form.ElementField {form} name="{name}[{i}].given">
						<div>
							<div class="flex items-center gap-1">
								<Form.Control let:attrs>
									<Input {...attrs} placeholder="John" bind:value={$form_data[name][i].given} />
								</Form.Control>
								<Button
									size="icon"
									variant="ghost"
									on:click={() => {
										$form_data[name].splice(i, 1);
										$form_data[name] = $form_data[name];
									}}
								>
									<X />
								</Button>
							</div>
							<Form.FieldErrors />
						</div>
					</Form.ElementField>
				</div>
			{:else}
				<div class="col-span-2 space-y-2">
					<Form.ElementField {form} name="{name}[{i}].literal">
						<div>
							<div class="flex items-center gap-1">
								<div class="grow">
									<Form.Control let:attrs>
										<Input
											{...attrs}
											placeholder="John Smith"
											bind:value={$form_data[name][i].literal}
										/>
									</Form.Control>
									<Form.FieldErrors />
								</div>
								<Button
									size="icon"
									variant="ghost"
									on:click={() => {
										$form_data[name].splice(i, 1);
										$form_data[name] = $form_data[name];
									}}
								>
									<X />
								</Button>
							</div>
							<Form.FieldErrors />
						</div>
					</Form.ElementField>
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
			? `Show ${$form_data[name].length - MAX_NAMES_SHOWN} more...`
			: `Add another ${label.toLowerCase()}`}
	</Button>
</Form.Fieldset>
