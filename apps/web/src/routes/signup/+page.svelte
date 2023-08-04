<script lang="ts">
	import { Button } from '$components/button';
	import { Input } from '$components/input';
	import IconApple from '~icons/logos/apple';
	import IconGoogle from '~icons/logos/google-icon';
	import IconDot from '~icons/lucide/dot';
	import IconCheck from '~icons/lucide/check';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { signup_schema } from '$lib/zod';
	import { get } from 'svelte/store';

	export let data;

	const { form, errors, enhance, constraints } = superForm(data.form, {
		validators: signup_schema,
	});

	const password_rules = get(errors).password;
</script>

<SuperDebug data={$form} />

<div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center">
	<div class="relative hidden lg:block bg-slate-900 self-stretch">
		<div class="absolute left-12 right-32 top-12">
			<p class="text-white text-xl">Fontesio</p>
			<p class="mt-36 text-6xl text-white font-bold">All of your references in one place.</p>
		</div>
	</div>

	<div class="w-full max-w-md mx-auto mt-16">
		<div class="space-y-2">
			<h1 class="text-3xl font-semibold">Create an account</h1>
			<p class="text-sm">Use a provider or enter your email below to create your account</p>
		</div>

		<div class="grid gap-4">
			<div class="grid grid-cols-2 gap-4 mt-6">
				<Button variant="outline">
					<IconApple class="mr-2 h-4 w-4 -translate-y-[1px]" />
					Sign in with Apple
				</Button>
				<Button variant="outline" href="/auth/login/google">
					<IconGoogle class="mr-2 h-4 w-4" />
					Sign in with Google
				</Button>
			</div>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
				</div>
			</div>
			<form id="email-password-form" class="grid gap-4" method="post" use:enhance>
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
			</form>

			<Button form="email-password-form" type="submit" class="w-full">Sign up for free</Button>
		</div>
		<div class="mt-8 text-center">
			<Button href="/auth/login" variant="link">Already have an account?</Button>
		</div>
	</div>
</div>
