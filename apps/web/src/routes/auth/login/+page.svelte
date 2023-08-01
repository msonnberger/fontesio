<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Sign in</h1>
<form method="post" use:enhance>
	<label for="email">email</label>
	<input type="email" name="email" id="email" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<input type="submit" />
</form>
<a href="/signup">Create an account</a>
