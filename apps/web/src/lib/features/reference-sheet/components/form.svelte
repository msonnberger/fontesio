<script lang="ts">
	import * as Form from '@fontesio/ui/primitives/form';
	import { csl_json_schema } from '@fontesio/citations/csl-json-schema';
	import CslTypeCombobox from './csl-type-combobox.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Button } from '@fontesio/ui/primitives/button';
	import { sheet_open } from '../stores';
	import NamesInput from './names-input.svelte';
	import { Input } from '@fontesio/ui/primitives/input';
	import type { CslJsonSchema } from '@fontesio/citations/types';

	export let data: SuperValidated<Infer<CslJsonSchema>>;

	const form = superForm(data, {
		validators: zod(csl_json_schema),
		dataType: 'json',
		onUpdated({ form }) {
			if (form.valid) {
				$sheet_open = false;
			}
		},
	});

	const { form: form_data, enhance } = form;
</script>

<form use:enhance method="post" action="?/add_reference" class="flex flex-col gap-3">
	<Form.Field {form} name="type">
		<div class="flex flex-col gap-2">
			<CslTypeCombobox bind:value={$form_data.type} />
			<Form.FieldErrors />
		</div>
	</Form.Field>
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input {...attrs} bind:value={$form_data.title} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<NamesInput {form} name="author" label="Author" />

	<Form.Fieldset {form} name="issued.date-parts">
		<Form.Legend class="sr-only">Date</Form.Legend>
		<div class="flex items-start gap-2 mt-4">
			{#each ['Year', 'Month', 'Day'] as label, i}
				<Form.ElementField {form} name="issued.date-parts[0][{i}]">
					<Form.Control let:attrs>
						<Form.Label>{label}</Form.Label>
						<Input {...attrs} bind:value={$form_data.issued['date-parts'][0][i]} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.ElementField>
			{/each}
		</div>
		<Form.FieldErrors />
	</Form.Fieldset>

	<div class="flex items-start gap-2">
		<Form.Field {form} name="volume">
			<Form.Control let:attrs>
				<Form.Label>Volume</Form.Label>
				<Input {...attrs} bind:value={$form_data.volume} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="issue">
			<Form.Control let:attrs>
				<Form.Label>Issue</Form.Label>
				<Input {...attrs} bind:value={$form_data.issue} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="page">
			<Form.Control let:attrs>
				<Form.Label>Pages</Form.Label>
				<Input {...attrs} bind:value={$form_data.page} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<Form.Field {form} name="container-title">
		<Form.Control let:attrs>
			<Form.Label>Journal</Form.Label>
			<Input {...attrs} bind:value={$form_data['container-title']} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="URL">
		<Form.Control let:attrs>
			<Form.Label>URL</Form.Label>
			<Input {...attrs} bind:value={$form_data.URL} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="DOI">
		<Form.Control let:attrs>
			<Form.Label>DOI</Form.Label>
			<Input {...attrs} bind:value={$form_data.DOI} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<div class="absolute left-0 bottom-0 right-0 p-6 space-x-2 border-t">
		<Form.Button>Save</Form.Button>
		<Button variant="secondary" href="/all-references">Cancel</Button>
	</div>
</form>
