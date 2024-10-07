<script lang="ts">
	import { page } from '$app/stores';
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { Article } from '../../../shared/Article';
	import DOMPurify from 'isomorphic-dompurify';

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
		<div>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html DOMPurify.sanitize(article.content)}
		</div>
	</article>
</main>
