<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
</script>

<h1>Welcome</h1>
<p>User id: {data.user_id}</p>
<p>Email: {data.email}</p>
<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>
