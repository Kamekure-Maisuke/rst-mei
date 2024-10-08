<script lang="ts">
	import { page } from '$app/stores';
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { Article } from '../../../shared/Article';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { formatDate } from '../../../utils/date';

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

<main class="container mx-auto px-4 py-8">
	<Card.Root>
		<Card.Header>
			<Card.Title tag="h2">{article.title}</Card.Title>
			<Badge class="w-1/12">{article.category?.name}</Badge>
			<div>
				<p class="text-sm font-medium">{article.user?.name}</p>
				<div class="text-sm text-muted-foreground">
					{formatDate(article.createdAt)}
				</div>
			</div>
		</Card.Header>
		<Card.Content>
			<div id="content" class="max-w-none">
				{article.content}
			</div>
		</Card.Content>
	</Card.Root>
	<a href="/">戻る</a>
</main>

<style>
	#content {
		white-space: pre-wrap;
	}
</style>
