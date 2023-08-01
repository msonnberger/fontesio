<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$components/button';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$components/card';
	import { Input } from '$components/input';
</script>

<div class="flex min-h-screen flex-col justify-center bg-[#f3f4f6] py-12 sm:px-6 lg:px-8">
	<div class="text-center sm:mx-auto sm:w-full sm:max-w-md">
		<h1 class="font-bold text-center text-3xl">Welcome back</h1>
	</div>
	<div class="mb-auto mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<Card class="w-full max-w-md mx-2">
			<CardHeader class="space-y-1">
				<CardTitle tag="h2" class="text-2xl">Login to your account</CardTitle>
			</CardHeader>
			<form method="post" use:enhance>
				<CardContent class="grid gap-4">
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
				</CardContent>
				<CardFooter>
					<Button type="submit" class="w-full">Login</Button>
				</CardFooter>
			</form>
		</Card>
		<div class="mt-8 text-center">
			<Button href="/signup" variant="link">You don't have an account yet?</Button>
		</div>
	</div>
</div>
