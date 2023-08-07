<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$components/button';
	import { Input } from '$components/input';
	import AuthForm from '../AuthForm.svelte';
</script>

<AuthForm heading="Sign in to your account">
	<form
		slot="email-password-form"
		id="email-password-form"
		class="grid gap-4"
		method="post"
		use:enhance
	>
		<Input
			label="Email address"
			placeholder="john.doe@example.com"
			type="email"
			name="email"
			id="email"
		/>
		<Input
			label="Password"
			placeholder="•••••••••••••"
			type="password"
			name="password"
			id="password"
		/>
		<Button form="email-password-form" type="submit" class="w-full">Sign in</Button>
	</form>

	<Button slot="bottom-link" href="/signup" variant="link">Don't have an account yet?</Button>
</AuthForm>
