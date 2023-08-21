<script>
	import '../app.postcss';
	import icon from '$lib/assets/logo/icon.svg';
	import apple_touch_icon from '$lib/assets/logo/apple-touch-icon.png';
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={icon} />
	<link rel="apple-touch-icon" href={apple_touch_icon} />
	<link rel="prefetch" href="/fonts/Inter-roman.var.woff2" />
</svelte:head>

<slot />
