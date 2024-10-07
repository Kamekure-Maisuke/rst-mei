<script lang="ts">
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { User } from '../../shared/User';

	let users: User[] = [];

	onMount(async () => {
		users = await remult.repo(User).find();
	});

	let newUserName = '';
	let newUserEmail = '';
	let newUserPassword = '';

	const addUser = async () => {
		const newUser = await remult.repo(User).insert({
			name: newUserName,
			email: newUserEmail,
			updatePassword: newUserPassword
		});
		users = [...users, newUser];
		newUserName = '';
		newUserEmail = '';
		newUserPassword = '';
	};

	const deleteUser = async (user: User) => {
		await remult.repo(User).delete(user);
		users = users.filter((c) => c.id !== user.id);
	};
</script>

<div>
	<h1>ユーザー一覧</h1>
	<a href="/">HOME</a>
	<main>
		<form on:submit|preventDefault={addUser}>
			<input bind:value={newUserName} placeholder="name" required />
			<input bind:value={newUserEmail} type="email" placeholder="email" required />
			<input bind:value={newUserPassword} type="password" placeholder="password" required />
			<button>追加</button>
		</form>

		{#each users as user}
			<div>
				<span>{user.name}</span>
				<button on:click={() => deleteUser(user)}>削除</button>
			</div>
		{/each}
	</main>
</div>
