<script lang="ts">
	import * as Button from '../button';
	type $$Props = Button.Props;
	type $$Events = Button.Events;
</script>

<Button.Root type="submit" {...$$restProps} on:click on:keydown>
	<slot />
</Button.Root>
