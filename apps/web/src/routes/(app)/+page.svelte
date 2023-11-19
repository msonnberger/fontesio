<script lang="ts">
	export let data;
</script>

<h1>All references</h1>
<table>
	<tr>
		<th>ID</th>
		<th>Type</th>
		<th>Title</th>
		<th>Key</th>
	</tr>
	{#each data.resources as { id, csl_json }}
		<tr>
			<td>{id}</td>
			<td>{csl_json.type}</td>
			<td>{csl_json.title}</td>
			<td>{csl_json.id}</td>
		</tr>
	{/each}
</table>
