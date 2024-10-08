<script lang="ts">
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { User } from '../../shared/User';
	import { Category } from '../../shared/Category';
	import { Article } from '../../shared/Article';
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import Pencil from 'lucide-svelte/icons/pencil';

	let title = '';
	let selectedUser: User;
	let selectedCategory: Category;
	let users: User[] = [];
	let categories: Category[] = [];
	let content = '';

	onMount(async () => {
		[categories, users] = await Promise.all([
			remult.repo(Category).find(),
			remult.repo(User).find()
		]);
	});

	const handleSubmit = async () => {
		await remult.repo(Article).insert({
			title: title,
			content: content,
			user: selectedUser,
			category: selectedCategory
		});
		title = '';
		content = '';
		goto('/');
	};
</script>

<Card.Root class="mx-auto mt-8 w-full max-w-md">
	<Card.Header>
		<Card.Title>投稿</Card.Title>
	</Card.Header>
	<Card.Content>
		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<Input id="title" bind:value={title} placeholder="タイトルを入力" required />
			</div>

			<div class="space-y-2">
				<select
					id="category"
					bind:value={selectedCategory}
					required
					class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="">カテゴリを選択</option>
					{#each categories as category}
						<option value={category}>{category.name}</option>
					{/each}
				</select>
			</div>

			<div class="space-y-2">
				<select
					id="user"
					bind:value={selectedUser}
					required
					class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="">投稿者を選択</option>
					{#each users as user}
						<option value={user}>{user.name}</option>
					{/each}
				</select>
			</div>

			<div class="space-y-2">
				<Textarea id="content" bind:value={content} placeholder="内容を入力" required />
			</div>

			<Button type="submit" class="w-full">
				<Pencil class="mr-2 h-4 w-4" />
				投稿
			</Button>
		</form>
		<div class="mt-4">
			<Button variant="link" href="/" class="w-full">HOME</Button>
		</div>
	</Card.Content>
</Card.Root>
