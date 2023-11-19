<script lang="ts">
	import type { SelectOption } from '@melt-ui/svelte';
	import * as Form from '$components/ui/form';
	import { csl_json_schema, csl_types, type CslJsonSchema } from '$lib/citations/schema';
	import { unslugify } from '$lib/utils/unslugify';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let selected: SelectOption<string> | undefined;
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
	<Form.Field {config} name="type">
		<Form.Item>
			<Form.Label>Type</Form.Label>
			<Form.Select bind:selected>
				<Form.SelectTrigger />
				<Form.SelectContent>
					{#each csl_types as type}
						<Form.SelectItem value={type}>{unslugify(type)}</Form.SelectItem>
					{/each}
				</Form.SelectContent>
			</Form.Select>
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
