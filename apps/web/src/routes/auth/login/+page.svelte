<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$components/button';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$components/card';
	import { Icons } from '$components/icons';
	import { Input } from '$components/input';
</script>

<div class="flex min-h-screen flex-col justify-center bg-[#f3f4f6] py-12 sm:px-6 lg:px-8">
	<div class="text-center sm:mx-auto sm:w-full sm:max-w-md">
		<h1 class="font-bold text-center text-3xl">Welcome back</h1>
	</div>
	<div class="mb-auto mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<Card class="w-full max-w-md mx-2">
			<CardHeader class="space-y-1">
				<CardTitle tag="h2" class="text-2xl">Sign in to your account</CardTitle>
			</CardHeader>

			<CardContent class="grid gap-4">
				<div class="grid grid-cols-2 gap-4">
					<Button variant="outline">
						<Icons.Apple class="mr-2 h-4 w-4 -translate-y-[1px]" />
						Sign in with Apple
					</Button>
					<Button variant="outline" href="/auth/login/google">
						<Icons.Google class="mr-2 h-4 w-4" />
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
				</form>
			</CardContent>
			<CardFooter>
				<Button form="email-password-form" type="submit" class="w-full">Sign in</Button>
			</CardFooter>
		</Card>
		<div class="mt-8 text-center">
			<Button href="/signup" variant="link">Don't have an account yet?</Button>
		</div>
	</div>
</div>
