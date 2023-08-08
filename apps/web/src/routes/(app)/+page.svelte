<script lang="ts">
	export let data;
</script>

<h1>Welcome</h1>
<p>User id: {data.user.userId}</p>
<p>Email: {data.user.email}</p>
<p>Verified: {data.user.email_verified}</p>

<a href="/logout">Sign out</a>
