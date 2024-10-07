<script lang="ts">
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { Article } from '../shared/Article';

	let articles: Article[] = [];
	onMount(async () => {
		articles = await remult.repo(Article).find({
			include: {
				user: true,
				category: true
			}
		});
	});

	function formatDate(date: Date | undefined) {
		if (!date) return;
		return new Date(date).toLocaleDateString('ja-JP', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	}
</script>

<div>
	<h1>rst-mei</h1>
	<main>
		<a class="post-button" href="/new">投稿する</a>
		<a href="/users">ユーザー管理</a>
		<a href="/categories">カテゴリ管理</a>
		{#each articles as article (article.id)}
			<div>
				<h2><a href="articles/{article.id}">{article.title}</a></h2>
				<p class="article-meta">
					[作者]: {article.user?.name}
					[カテゴリ]: <span class="category">{article.category?.name}</span>
					[投稿日]: {formatDate(article.createdAt)}
				</p>
			</div>
		{/each}
	</main>
</div>

<style>
	.post-button {
		background-color: #4caf50;
		color: white;
		border: none;
		padding: 5px 10px;
		border-radius: 4px;
		cursor: pointer;
	}
	.article-meta {
		font-size: 0.9em;
		color: #666;
	}
	.category {
		background-color: #e0e0e0;
		padding: 3px 8px;
		border-radius: 12px;
		font-size: 0.8em;
	}
</style>
