<script lang="ts">
	import { Alert, AlertDescription } from '@fontesio/ui/primitives/alert';
	import { Button } from '@fontesio/ui/primitives/button';
	import { Input } from '@fontesio/ui/primitives/input';
	import * as Form from '@fontesio/ui/primitives/form';
	import { superForm } from 'sveltekit-superforms';
	import AuthForm from '../AuthForm.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { login_schema } from '$lib/zod';

	export let data;

	const form = superForm(data.form, {
		validators: zodClient(login_schema),
	});

	const { form: form_data, message, enhance } = form;
</script>

<svelte:head>
	<title>Sign in | Fontesio</title>
</svelte:head>

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
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email address</Form.Label>
				<Input
					{...attrs}
					bind:value={$form_data.email}
					placeholder="john.doe@example.com"
					type="email"
					id="email"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input
					{...attrs}
					bind:value={$form_data.password}
					placeholder="•••••••••••••"
					type="password"
					id="password"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button class="w-full">Sign in</Form.Button>
	</form>

	<Button slot="bottom-link" href="/signup" variant="link">Don't have an account yet?</Button>
</AuthForm>
