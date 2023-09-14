<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';

	type Expense = {
		name: string;
		description: string;
		price: number;
		date: Date;
		paidBy: string;
		category: string;
	};

	let expensesByCategory: Record<string, Expense[]> = {};

	onMount(async () => {
		const { data } = await axios.get<Expense[]>('http://localhost:3000/expenses/');
		expensesByCategory = data.reduce((acc, expense) => {
			if (!acc[expense.category]) {
				acc[expense.category] = [];
			}
			acc[expense.category].push(expense);
			return acc;
		}, {} as Record<string, Expense[]>);
	});
</script>

<div class="container mx-auto p-4">
	<div class="overflow-y-auto h-[calc(100vh-5rem)]">
		{#each Object.keys(expensesByCategory) as category}
			<table class="min-w-full bg-white mt-4">
				<thead>
					<tr>
						<th class="py-2 px-4 border-b">{category}</th>
						<th class="py-2 px-4 border-b">Price</th>
					</tr>
				</thead>
				<tbody>
					{#each expensesByCategory[category] as expense}
						<tr>
							<td class="py-2 px-4 border-b">{expense.name}</td>
							<td class="py-2 px-4 border-b">${expense.price}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/each}
	</div>
</div>
