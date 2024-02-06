<script lang="ts">
	import * as Form from '@fontesio/ui/primitives/form';
	import { csl_json_schema } from '@fontesio/citations/csl-json-schema';
	import { page } from '$app/stores';
	import CslTypeCombobox from './csl-type-combobox.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Button from '@fontesio/ui/primitives/button/button.svelte';
	import PlusCircle from '~icons/lucide/plus-circle';
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
	class="flex flex-col gap-3 mt-6 pb-10 h-[calc(100%-140px)] overflow-y-scroll"
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

	<div class="absolute left-0 bottom-0 p-6 space-x-2">
		<Form.Button>Save</Form.Button>
		<Button variant="secondary" href="/all-references">Cancel</Button>
	</div>
</Form.Root>
