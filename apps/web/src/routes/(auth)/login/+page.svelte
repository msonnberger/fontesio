<script lang="ts">
	import { Alert, AlertDescription } from '@fontesio/ui/primitives/alert';
	import { Button } from '@fontesio/ui/primitives/button';
	import { Input } from '@fontesio/ui/primitives/input';
	import { superForm } from 'sveltekit-superforms/client';
	import AuthForm from '../AuthForm.svelte';

	export let data;

	const { form, enhance, constraints, message } = superForm(data.form);
</script>

<AuthForm heading="Sign in to your account">
	<form
		slot="email-password-form"
		id="email-password-form"
		class="grid gap-4"
		method="post"
		use:enhance
	>
		{#if $message}
			<Alert variant="destructive">
				<AlertDescription>{$message}</AlertDescription>
			</Alert>
		{/if}
		<Input
			{...$constraints.email}
			bind:value={$form.email}
			label="Email address"
			placeholder="john.doe@example.com"
			type="email"
			name="email"
			id="email"
		/>
		<Input
			{...$constraints.password}
			bind:value={$form.password}
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
