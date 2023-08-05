<script lang="ts">
	import { Button } from '$components/button';
	import envelope from '$lib/assets/images/envelope.svg';

	export let form;
</script>

<div class="flex flex-col items-center gap-6 text-center">
	<img src={envelope} alt="Email illustration" class="w-28" />
	<h1 class="text-3xl font-semibold mt-4">Check your email.</h1>
	<p class="max-w-sm">
		To complete the signup process, please verify your email address. We have sent a verification
		link to the email address you provided.
	</p>

	<form method="post">
		<Button type="submit" variant="link" size="sm" class="mt-5">
			Didn't get the mail? Send it again
		</Button>
		{#if form?.new_link_sent}
			<p class="text-sm">New link sent!</p>
		{/if}
	</form>
</div>
