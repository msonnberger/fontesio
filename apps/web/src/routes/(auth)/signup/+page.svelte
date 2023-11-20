<script lang="ts">
	import { Button } from '@fontesio/ui/primitives/button';
	import { Input } from '@fontesio/ui/primitives/input';
	import IconDot from '~icons/lucide/dot';
	import IconCheck from '~icons/lucide/check';
	import { superForm } from 'sveltekit-superforms/client';
	import { signup_schema } from '$lib/zod';
	import { get } from 'svelte/store';
	import AuthForm from '../AuthForm.svelte';
	import { Alert, AlertDescription } from '@fontesio/ui/primitives/alert';

	export let data;

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		validators: signup_schema,
	});

	const password_rules = get(errors).password;
</script>

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
			bind:value={$form.password}
			label="Password"
			placeholder="•••••••••••••"
			type="password"
			name="password"
			id="password"
		/>
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
		<Button type="submit" class="w-full">Sign up for free</Button>
	</form>

	<Button slot="bottom-link" href="/login" variant="link">Already have an account?</Button>
</AuthForm>
