<script lang="ts">
	import * as Tabs from '@fontesio/ui/primitives/tabs';
	import { page } from '$app/stores';
	import { cite } from '@fontesio/citations/cite';
	import { Label } from '@fontesio/ui/primitives/label';
	import CopyButton from './copy-button.svelte';

	let citation_style = 'apa';

	$: reference = $page.data.reference;
	$: in_text_citation = reference
		? cite(reference.csl_json, { type: 'citation', style: citation_style })
		: '';
	$: bibliography_citation = reference
		? cite(reference.csl_json, { type: 'bibliography', style: citation_style })
		: '';
	$: bibtex_citation = reference ? cite(reference.csl_json, { type: 'bibtex' }) : '';
</script>

<div class="space-y-4">
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
			<p class="font-serif max-h-48 overflow-scroll whitespace-pre-wrap">
				{bibliography_citation}
			</p>
			<CopyButton text_to_copy={bibliography_citation} />
		</div>
	</div>
</div>
