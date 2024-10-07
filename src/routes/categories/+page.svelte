<script lang="ts">
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { Category } from '../../shared/Category';

	let categories: Category[] = [];

	onMount(async () => {
		categories = await remult.repo(Category).find();
	});

	let newCategoryName = '';
	let newCategoryDescription = '';

	const addCategory = async () => {
		const newCategory = await remult.repo(Category).insert({
			name: newCategoryName,
			description: newCategoryDescription
		});
		categories = [...categories, newCategory];
		newCategoryName = '';
		newCategoryDescription = '';
	};

	const deleteCategory = async (category: Category) => {
		await remult.repo(Category).delete(category);
		categories = categories.filter((c) => c.id !== category.id);
	};
</script>

<div>
	<h1>カテゴリ一覧</h1>
	<a href="/">HOME</a>
	<main>
		<form on:submit|preventDefault={addCategory}>
			<input bind:value={newCategoryName} placeholder="name" required />
			<input bind:value={newCategoryDescription} placeholder="description" required />
			<button>追加</button>
		</form>

		{#each categories as category}
			<div>
				<span>{category.name}</span>
				<button on:click={() => deleteCategory(category)}>削除</button>
			</div>
		{/each}
	</main>
</div>
