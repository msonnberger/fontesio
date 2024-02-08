<script lang="ts">
	import * as Dialog from '@fontesio/ui/primitives/dialog';
	import * as Tabs from '@fontesio/ui/primitives/tabs';
	import { page } from '$app/stores';
	import { cite } from '@fontesio/citations/cite';
	import { Label } from '@fontesio/ui/primitives/label';
	import CopyButton from './copy-button.svelte';

	let citation_style = 'apa';

	$: dialog_open = Boolean($page.state.citation_dialog_reference);
	$: reference = $page.state.citation_dialog_reference;
	$: in_text_citation = reference
		? cite(reference.csl_json, { type: 'citation', style: citation_style })
		: '';
	$: bibliography_citation = reference
		? cite(reference.csl_json, { type: 'bibliography', style: citation_style })
		: '';
	$: bibtex_citation = reference ? cite(reference.csl_json, { type: 'bibtex' }) : '';
</script>

<Dialog.Root
	bind:open={dialog_open}
	onOpenChange={(open) => {
		if (!open) {
			history.back();
		}
	}}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Cite Reference</Dialog.Title>
			<Dialog.Description>Create a citation for the reference below</Dialog.Description>
		</Dialog.Header>
		<div class="space-y-2">
			<Label>Citation Style</Label>
			<div class="flex justify-between items-center">
				<Tabs.Root bind:value={citation_style}>
					<Tabs.List>
						<Tabs.Trigger value="apa">APA</Tabs.Trigger>
						<Tabs.Trigger value="vancouver">Vancouver</Tabs.Trigger>
						<Tabs.Trigger value="harvard1">Harvard</Tabs.Trigger>
					</Tabs.List>
				</Tabs.Root>
				<CopyButton text_to_copy={bibtex_citation}>Copy BibTeX</CopyButton>
			</div>
		</div>
		<div class="space-y-2">
			<Label>In-text</Label>
			<div class="rounded-md bg-muted p-3 flex justify-between items-center">
				<p class="font-serif">
					{in_text_citation}
				</p>
				<CopyButton text_to_copy={in_text_citation} />
			</div>
		</div>

		<div class="space-y-2">
			<Label>Bibliography</Label>
			<div class="rounded-md bg-muted p-3 flex justify-between items-start">
				<p class="font-serif max-h-32 overflow-scroll whitespace-pre-wrap">
					{bibliography_citation}
				</p>
				<CopyButton text_to_copy={bibliography_citation} />
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
