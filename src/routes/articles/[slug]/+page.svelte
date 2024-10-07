<script lang="ts">
	import { page } from '$app/stores';
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { Article } from '../../../shared/Article';

	const articleId = Number($page.params.slug);
	let article = {} as Article;

	onMount(async () => {
		article = (await remult.repo(Article).findId(articleId, {
			include: {
				user: true,
				category: true
			}
		})) as Article;
	});
</script>

<main>
	<article>
		<h1>{article.title}</h1>
		<div id="content">
			{article.content}
		</div>
	</article>
</main>

<style>
	#content {
		white-space: pre-wrap;
	}
</style>
