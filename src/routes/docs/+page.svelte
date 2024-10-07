<script lang="ts">
	import { onMount } from 'svelte';
	import SwaggerUI from 'swagger-ui';
	import 'swagger-ui/dist/swagger-ui.css';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
		SwaggerUI({
			spec: data.apiDoc,
			dom_id: '#swagger-ui-container'
		});
	});
</script>

<svelte:head>
	<title>SwaggerUI</title>
</svelte:head>

<div id="swagger-ui-container" />
