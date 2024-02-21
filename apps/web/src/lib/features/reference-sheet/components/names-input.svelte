<script lang="ts">
	import * as Form from '@fontesio/ui/primitives/form';
	import { Button } from '@fontesio/ui/primitives/button';
	import type { SuperForm, Infer } from 'sveltekit-superforms';
	import PlusCircle from '~icons/lucide/plus-circle';
	import X from '~icons/lucide/x';
	import { onMount, tick } from 'svelte';
	import { Input } from '@fontesio/ui/primitives/input';
	import type { CslJsonSchema, CslNameField } from '@fontesio/citations/types';

	export let name: CslNameField;
	export let form: SuperForm<Infer<CslJsonSchema>>;
	export let label: string;

	$: form_data = form.form;

	function add_name() {
		$form_data[name] = [
			...$form_data[name],
			'family' in $form_data[name].at(-1)!
				? { family: undefined, given: undefined }
				: { literal: undefined },
		];
		tick().then(() => {
			const inputs = [...document.querySelectorAll<HTMLInputElement>(`input[name^='${name}']`)];

			if ('family' in $form_data[name].at(-1)!) {
				inputs.at(-2)?.focus();
			} else {
				inputs.at(-1)?.focus();
			}
		});
	}

	function update_name(i: number, part: 'family' | 'given' | 'literal', value: string) {
		$form_data[name][i]![part] = value;
	}

	function remove_name_at_index(i: number) {
		$form_data[name].splice(i, 1);
		$form_data[name] = $form_data[name];
	}

	const MAX_NAMES_SHOWN = 5;
	let collapsed = false;
	onMount(() => (collapsed = $form_data[name].length > MAX_NAMES_SHOWN));
	$: names = collapsed ? $form_data[name].slice(0, MAX_NAMES_SHOWN) : $form_data[name];
</script>

<Form.Fieldset {form} {name}>
	<Form.Legend class="col-span-2">{label}</Form.Legend>
	<Form.Description class="col-span-2">
		Last name and first name of the {label.toLowerCase()}
	</Form.Description>
	<div class="grid grid-cols-2 gap-x-1 gap-y-2 mt-2">
		{#each names as { family, given, literal }, i (i)}
			{#if 'family' in names[i]}
				<Form.ElementField {form} name="{name}[{i}].family">
					<div>
						<Form.Control let:attrs>
							<Input
								{...attrs}
								placeholder="Smith"
								value={family}
								on:input={(e) => update_name(i, 'family', e.currentTarget.value)}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</div>
				</Form.ElementField>
				<Form.ElementField {form} name="{name}[{i}].given">
					<div>
						<div class="flex items-center gap-1">
							<Form.Control let:attrs>
								<Input
									{...attrs}
									placeholder="John"
									value={given}
									on:input={(e) => update_name(i, 'given', e.currentTarget.value)}
								/>
							</Form.Control>
							<Button size="icon" variant="ghost" on:click={() => remove_name_at_index(i)}>
								<X />
							</Button>
						</div>
						<Form.FieldErrors />
					</div>
				</Form.ElementField>
			{:else}
				<Form.ElementField {form} name="{name}[{i}].literal" class="col-span-2 space-y-0">
					<div class="flex items-center gap-1">
						<div class="grow">
							<Form.Control let:attrs>
								<Input
									{...attrs}
									placeholder="John Smith"
									value={literal}
									on:input={(e) => update_name(i, 'literal', e.currentTarget.value)}
								/>
							</Form.Control>
						</div>
						<Button size="icon" variant="ghost" on:click={() => remove_name_at_index(i)}>
							<X />
						</Button>
					</div>
					<Form.FieldErrors />
				</Form.ElementField>
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
