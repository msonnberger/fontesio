<script lang="ts">
	import * as Form from '@fontesio/ui/primitives/form';
	import { csl_json_schema } from '@fontesio/citations/csl-json-schema';
	import { page } from '$app/stores';
	import CslTypeCombobox from './csl-type-combobox.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Button from '@fontesio/ui/primitives/button/button.svelte';
	import { sheet_open } from '../stores';
	import NamesInput from './names-input.svelte';

	const super_form = superForm($page.data.manual_form, {
		dataType: 'json',
		taintedMessage: false,
		onUpdated({ form }) {
			if (form.valid) {
				$sheet_open = false;
			}
		},
	});

	const { form } = super_form;
</script>

<Form.Root
	let:config
	controlled
	form={super_form}
	action="?/add_reference"
	schema={csl_json_schema}
	class="flex flex-col gap-3 mt-6 pl-[1px] pr-6 pb-10 h-[calc(100%-140px)] overflow-y-scroll"
>
	<Form.Field {config} name="type" let:setValue let:value>
		<Form.Item class="flex flex-col gap-2">
			<Form.Label>Reference Type</Form.Label>
			<CslTypeCombobox {value} set_value={setValue} />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="title">
		<Form.Item>
			<Form.Label>Title</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<NamesInput {form} {config} name="author" label="Author" />

	<div class="flex items-start gap-2 mt-4">
		<Form.Field {config} name="issued.date-parts[0][0]">
			<Form.Item>
				<Form.Label>Year</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="issued.date-parts[0][1]">
			<Form.Item>
				<Form.Label>Month</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="issued.date-parts[0][2]">
			<Form.Item>
				<Form.Label>Day</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
	</div>

	<div class="flex items-start gap-2">
		<Form.Field {config} name="volume">
			<Form.Item>
				<Form.Label>Volume</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="issue">
			<Form.Item>
				<Form.Label>Issue</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="page">
			<Form.Item>
				<Form.Label>Pages</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
	</div>

	<Form.Field {config} name="container-title">
		<Form.Item>
			<Form.Label>Journal</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="URL">
		<Form.Item>
			<Form.Label>URL</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="DOI">
		<Form.Item>
			<Form.Label>DOI</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<div class="absolute left-0 bottom-0 p-6 space-x-2">
		<Form.Button>Save</Form.Button>
		<Button variant="secondary" href="/all-references">Cancel</Button>
	</div>
</Form.Root>
