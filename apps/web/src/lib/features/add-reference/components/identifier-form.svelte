<script lang="ts">
	import { Button } from '@fontesio/ui/primitives/button';
	import { Input } from '@fontesio/ui/primitives/input';
	import { Label } from '@fontesio/ui/primitives/label';
	import ArrowRight from '~icons/lucide/arrow-right';
	import { csl_from_identifier } from '@fontesio/citations/csl-from-identifier';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { csl_json_schema } from '@fontesio/citations/csl-json-schema';

	const { form, enhance, errors } = superForm($page.data.from_identifier_form, {
		dataType: 'json',
		validators: csl_json_schema,
		onSubmit: async ({ formData, cancel }) => {
			if (!formData.has('identifier')) {
				cancel();
			}

			try {
				const csl_json = await csl_from_identifier(formData.get('identifier') as string);
				$form = csl_json;
			} catch (error) {
				if (error instanceof Error) {
					$errors.identifier = [error.message];
				}
			}
		},
	});
</script>

<form method="post" action="?/add_reference" class="space-y-2" use:enhance>
	<Label for="identifier">Enter an ISBN, DOI or PMCID to add to your library:</Label>
	<div class="flex gap-2 w-full">
		<div class="grow">
			<Input
				autocomplete="new-password"
				type="text"
				name="identifier"
				id="identifier"
				placeholder="10.1112/plms/s2-42.1.230"
			/>
		</div>
		<Button type="submit" size="icon" variant="secondary">
			<ArrowRight />
		</Button>
	</div>
</form>
