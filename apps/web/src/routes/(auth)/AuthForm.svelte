<script lang="ts">
	import { Button } from '@fontesio/ui/primitives/button';
	import AppleIcon from '~icons/logos/apple';
	import GoogleIcon from '~icons/logos/google-icon';

	export let heading: string;
	export let subheading: string = '';
</script>

<div class="space-y-2">
	<h1 class="text-3xl font-semibold">{heading}</h1>
	<p class="text-sm">{subheading}</p>
</div>

<div class="grid gap-4">
	<div class="grid grid-cols-2 gap-4 mt-6">
		<Button variant="outline">
			<AppleIcon class="mr-2 h-4 w-4 -translate-y-[1px]" />
			Sign in with Apple
		</Button>
		<Button variant="outline" href="/login/google">
			<GoogleIcon class="mr-2 h-4 w-4" />
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

	<slot name="email-password-form" />
</div>
<div class="mt-8 text-center">
	<slot name="bottom-link" />
</div>
