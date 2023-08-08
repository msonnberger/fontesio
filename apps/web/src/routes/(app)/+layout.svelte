<div class="flex h-screen bg-slate-200">
	<aside class="sticky top-0 p-12">
		<div class="flex gap-3 items-center">
			<div class="rounded-full w-8 h-8 bg-indigo-300" />
			<span class="text-lg">Fontesio</span>
		</div>
	</aside>

	<div class="w-full p-1.5">
		<main class="w-full h-full overflow-y-scroll bg-white rounded-xl p-8 shadow-md">
			<slot />
		</main>
	</div>
</div>
