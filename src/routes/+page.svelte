<script lang="ts">
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { Article } from '../shared/Article';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import * as Menubar from '$lib/components/ui/menubar';
	import { formatDate } from '../utils/date';
	import Pencil from 'lucide-svelte/icons/pencil';
	import { goto } from '$app/navigation';

	let articles: Article[] = [];
	onMount(async () => {
		articles = await remult.repo(Article).find({
			include: {
				user: true,
				category: true
			}
		});
	});

	const deleteArticle = async (article: Article) => {
		await remult.repo(Article).delete(article);
		articles = articles.filter((a) => a.id !== article.id);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		switch (e.key) {
			// 投稿画面
			case 'n':
				goto('/new');
				break;
		}
	};
</script>

<div>
	<h1>rst-mei</h1>
	<main>
		<Menubar.Root>
			<Button href="/new">
				<Pencil class="mr-2 h-4 w-4" />
				投稿する
			</Button>
			<Menubar.Menu>
				<Menubar.Trigger>マスタ管理</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>
						<a href="/users">ユーザー管理</a>
					</Menubar.Item>
					<Menubar.Item>
						<a href="/categories">カテゴリ管理</a>
					</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		</Menubar.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title tag="h2">記事一覧</Card.Title>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>タイトル</Table.Head>
							<Table.Head>作者</Table.Head>
							<Table.Head>カテゴリ</Table.Head>
							<Table.Head>投稿日時</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each articles as article (article.id)}
							<Table.Row>
								<Table.Cell>{article.title}</Table.Cell>
								<Table.Cell>{article.user?.name}</Table.Cell>
								<Table.Cell><Badge variant="secondary">{article.category?.name}</Badge></Table.Cell>
								<Table.Cell>{formatDate(article.createdAt)}</Table.Cell>
								<Table.Cell>
									<Button href="/articles/{article.id}" variant="outline">詳細</Button>
								</Table.Cell>
								<Table.Cell>
									<Button on:click={() => deleteArticle(article)} variant="outline">削除</Button>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</main>
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
</style>
