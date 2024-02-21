<script lang="ts">
	import { Button } from '@fontesio/ui/primitives/button';
	import { Input } from '@fontesio/ui/primitives/input';
	import * as Form from '@fontesio/ui/primitives/form';
	import IconDot from '~icons/lucide/dot';
	import IconCheck from '~icons/lucide/check';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signup_schema } from '$lib/zod';
	import { get } from 'svelte/store';
	import AuthForm from '../AuthForm.svelte';
	import { Alert, AlertDescription } from '@fontesio/ui/primitives/alert';

	export let data;

	const form = superForm(data.form, {
		validators: zodClient(signup_schema),
	});

	const { form: form_data, errors, enhance, message } = form;

	const password_rules = get(errors).password;
</script>

<svelte:head>
	<title>Sign up | Fontesio</title>
</svelte:head>

<AuthForm
	heading="Create an account"
	subheading="Use an existing social login or enter your email below"
>
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
		</Form.Field>

		<ul class="text-sm -mt-2 mb-2">
			{#each password_rules ?? [] as rule}
				{@const rule_met = !$errors.password?.includes(rule)}
				<li class:text-green-600={rule_met}>
					{#if !rule_met}
						<IconDot class="inline-block" />
					{:else}
						<IconCheck class="inline-block text-xs font-bold ml-0.5" />
					{/if}
					{rule}
				</li>
			{/each}
		</ul>
		<Form.Button class="w-full">Sign up for free</Form.Button>
	</form>

	<Button slot="bottom-link" href="/login" variant="link">Already have an account?</Button>
</AuthForm>
