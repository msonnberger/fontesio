<script lang="ts">
	import * as Form from '@fontesio/ui/primitives/form';
	import { csl_json_form } from '@fontesio/citations/csl-json-schema';
	import { page } from '$app/stores';
	import CslTypeCombobox from '$lib/features/add-resource/components/csl-type-combobox.svelte';
	import type { CslType } from '@fontesio/citations/types';
	import { superForm } from 'sveltekit-superforms/client';

	export let initial_type: CslType;
	export let sheet_open: boolean;

	const super_form = superForm($page.data.form, {
		dataType: 'json',
		validators: csl_json_form,
		onUpdated({ form }) {
			if (form.valid) {
				sheet_open = false;
			}
		},
	});
</script>

<Form.Root
	let:config
	controlled
	form={super_form}
	debug={true}
	action="?/add_resource"
	schema={csl_json_form}
	class="flex flex-col gap-3 mt-6"
>
	<Form.Field {config} name="type" let:setValue let:value>
		<Form.Item class="flex flex-col">
			<Form.Label>Reference Type</Form.Label>
			<CslTypeCombobox {value} set_value={setValue} initial_value={initial_type} />
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
	<Form.Field {config} name="author">
		<Form.Item>
			<Form.Label>Author</Form.Label>
			<Form.Input />
			<Form.Description>Full name of the author (e.g. John Doe)</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button class="self-end">Add Resource</Form.Button>
</Form.Root>
