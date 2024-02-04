<script lang="ts">
	import * as Form from '@fontesio/ui/primitives/form';
	import { csl_json_form } from '@fontesio/citations/csl-json-schema';
	import { page } from '$app/stores';
	import CslTypeCombobox from './csl-type-combobox.svelte';
	import type { CslType } from '@fontesio/citations/types';
	import { superForm } from 'sveltekit-superforms/client';
	import Button from '@fontesio/ui/primitives/button/button.svelte';
	import PlusCircle from '~icons/lucide/plus-circle';

	export let initial_type: CslType;
	export let sheet_open: boolean;

	const super_form = superForm($page.data.manual_form, {
		dataType: 'json',
		validators: csl_json_form,
		onUpdated({ form }) {
			if (form.valid) {
				sheet_open = false;
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
	schema={csl_json_form}
	class="flex flex-col gap-3 mt-6 pb-10 h-[calc(100%-140px)] overflow-y-scroll"
>
	<Form.Field {config} name="type" let:setValue let:value>
		<Form.Item class="flex flex-col gap-2">
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

	<Form.Field {config} name="author[0]">
		<Form.Item>
			<Form.Label>Author</Form.Label>
			<Form.Description>Full name of the author (e.g. John Doe)</Form.Description>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	{#each $form.author.slice(1) as _, i (i)}
		<Form.Field {config} name="author[{i + 1}]">
			<Form.Item>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
	{/each}
	<Button
		class="self-start"
		variant="secondary"
		size="sm"
		type="button"
		on:click={() => {
			$form.author = [...$form.author, undefined];
		}}
	>
		<PlusCircle class="mr-2" />
		Add another author
	</Button>

	<div class="absolute left-0 bottom-0 p-6 space-x-2">
		<Form.Button>Add Reference</Form.Button>
		<Button type="button" variant="secondary" on:click={() => (sheet_open = false)}>Cancel</Button>
	</div>
</Form.Root>
