<script lang="ts">
	import { createPinInput } from '@melt-ui/svelte';
	import { Button } from '$components/ui/button';
	import envelope from '$lib/assets/images/envelope.svg';

	const {
		elements: { root, input, hiddenInput },
	} = createPinInput({ placeholder: '' });

	export let form;
</script>

<div class="flex flex-col items-center gap-6 text-center">
	<img src={envelope} alt="Email illustration" width="100" height="100" />
	<h1 class="text-3xl font-semibold mt-4">Verify your email.</h1>
	<p class="max-w-sm">We sent a 6 digit code to your email address.</p>

	<form action="?/verify" method="post">
		<input
			{...$hiddenInput}
			use:hiddenInput
			type="hidden"
			name="verification_code"
			id="verification_code"
		/>
		<div {...$root} use:root class="flex items-center gap-2 mb-8">
			{#each Array.from({ length: 6 }) as _}
				<input
					class="rounded-md bg-indigo-100 text-center text-lg shadow-sm w-12 h-12 caret-transparent"
					{...$input()}
					use:input
				/>
			{/each}
		</div>
		<Button type="submit">Verify & Continue</Button>
	</form>

	<form action="?/new_code" method="post">
		<p>
			<span class="text-sm">Didn't get the email?</span>
			<Button type="submit" variant="link" class="mt-5 pl-0">Send it again</Button>
		</p>
		{#if form?.new_code_sent}
			<p class="text-sm">New verification code sent!</p>
		{/if}
	</form>
</div>
