<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
</script>

<h1>Welcome</h1>
<p>User id: {data.user.userId}</p>
<p>Email: {data.user.email}</p>
<p>Verified: {data.user.email_verified}</p>
<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>
