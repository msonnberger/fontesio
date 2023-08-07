<script lang="ts">
	import signup_background from '$lib/assets/images/signup.webp';
</script>

<div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center">
	<div
		class="relative hidden lg:block self-stretch bg-cover"
		style="background-image: url({signup_background});"
	>
		<div class="absolute left-12 right-32 top-12">
			<p class="text-white text-xl">Fontesio</p>
			<p class="mt-36 text-6xl text-white font-bold">All of your references in one place.</p>
		</div>
	</div>

	<div class="w-full max-w-md mx-auto px-5 mt-8">
		<slot />
	</div>
</div>
