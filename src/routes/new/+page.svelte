<script lang="ts">
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { User } from '../../shared/User';
	import { Category } from '../../shared/Category';
	import { Article } from '../../shared/Article';
	import { goto } from '$app/navigation';

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

<div>
	<h1>投稿</h1>
	<main>
		<form on:submit|preventDefault={handleSubmit}>
			<div>
				<input bind:value={title} placeholder="title" required />
			</div>

			<div>
				<select id="category" bind:value={selectedCategory} required>
					<option value="">カテゴリを選択</option>
					{#each categories as category}
						<option value={category}>{category.name}</option>
					{/each}
				</select>
			</div>

			<div>
				<select id="user" bind:value={selectedUser} required>
					<option value="">投稿者を選択</option>
					{#each users as user}
						<option value={user}>{user.name}</option>
					{/each}
				</select>
			</div>

			<div>
				<textarea id="content" bind:value={content} rows="10" required></textarea>
			</div>

			<button>投稿</button>
		</form>
		<a href="/">HOME</a>
	</main>
</div>
