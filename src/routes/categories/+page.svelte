<script lang="ts">
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { Category } from '../../shared/Category';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

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
	<main>
		<Card.Root class="mx-auto mt-8 w-full max-w-md">
			<Card.Header>
				<Card.Title tag="h2">カテゴリ一覧</Card.Title>
			</Card.Header>
			<Card.Content>
				<form on:submit|preventDefault={addCategory}>
					<div class="space-y-2">
						<Input
							id="title"
							bind:value={newCategoryName}
							placeholder="カテゴリ名を入力"
							required
						/>
						<Input
							id="title"
							bind:value={newCategoryDescription}
							placeholder="説明を入力"
							required
						/>
					</div>
					<Button type="submit" class="mt-2 w-full">作成</Button>
				</form>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>名前</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each categories as category (category.id)}
							<Table.Row>
								<Table.Cell>{category.name}</Table.Cell>
								<Table.Cell>
									<AlertDialog.Root>
										<AlertDialog.Trigger asChild let:builder>
											<Button builders={[builder]} variant="outline">削除</Button>
										</AlertDialog.Trigger>
										<AlertDialog.Content>
											<AlertDialog.Header>
												<AlertDialog.Title>本当に削除しますか?</AlertDialog.Title>
											</AlertDialog.Header>
											<AlertDialog.Footer>
												<AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
												<AlertDialog.Action>
													<Button on:click={() => deleteCategory(category)}>削除</Button>
												</AlertDialog.Action>
											</AlertDialog.Footer>
										</AlertDialog.Content>
									</AlertDialog.Root>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</main>
</div>
