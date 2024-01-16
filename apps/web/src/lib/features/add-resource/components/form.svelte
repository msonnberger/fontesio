<script lang="ts">
	import * as Form from '@fontesio/ui/primitives/form';
	import { csl_json_schema } from '@fontesio/citations/csl-json-schema';
	import type { CslJsonSchema } from '@fontesio/citations/types';
	import type { SuperValidated } from 'sveltekit-superforms';
	import CslTypeCombobox from '$lib/features/add-resource/components/csl-type-combobox.svelte';
	import type { CslType } from '@fontesio/citations/types';

	export let initial_type: CslType;
	export let sheet_open: boolean;
	export let form: SuperValidated<CslJsonSchema>;
</script>

<Form.Root
	action="?/add_resource"
	schema={csl_json_schema}
	class="flex flex-col gap-6"
	let:config
	{form}
	options={{
		onUpdated({ form }) {
			if (form.valid) {
				sheet_open = false;
			}
		},
	}}
>
	<Form.Field {config} name="type" let:setValue let:value>
		<Form.Item class="flex flex-col">
			<Form.Label>Type</Form.Label>
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
	<Form.Field {config} name="id">
		<Form.Item>
			<Form.Label>ID</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button class="self-end">Add Resource</Form.Button>
</Form.Root>
