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
	let selectedExpense: Expense | null = null; // To store the selected expense for the modal

	// Function to open the modal and set the selected expense
	function openModal(expense: Expense) {
		selectedExpense = expense;
	}

	onMount(async () => {
		try {
			const { data } = await axios.get<Expense[]>('http://localhost:3000/expenses/');
			expensesByCategory = data.reduce((acc, expense) => {
				if (!acc[expense.category]) {
					acc[expense.category] = [];
				}
				acc[expense.category].push(expense);
				return acc;
			}, {} as Record<string, Expense[]>);
		} catch (error) {
			console.error(error);
		}
	});
</script>

<div class="container mx-auto p-4">
	<div class="flex flex-wrap">
		{#each Object.keys(expensesByCategory) as category}
			<div class="w-1/2 px-4">
				<div class="overflow-y-auto h-[calc(50vh-2rem)] border rounded p-2 mb-4">
					<table class="min-w-full bg-white">
						<thead>
							<tr>
								<th class="py-2 px-4 border-b">{category}</th>
								<th class="py-2 px-4 border-b">Price</th>
								<th class="py-2 px-4 border-b" />
							</tr>
						</thead>
						<tbody>
							{#each expensesByCategory[category] as expense}
								<tr>
									<td class="py-2 px-4 border-b">{expense.name}</td>
									<td class="py-2 px-4 border-b">${expense.price.toFixed(2)}</td>
									<td class="py-2 px-4 border-b">
										<button
											class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
											on:click={() => openModal(expense)}
										>
											Modify
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Modal for editing expense -->
{#if selectedExpense !== null}
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<div class="modal-bg absolute inset-0 bg-gray-900 opacity-50" />
		<div class="modal-content bg-white w-1/2 p-4 rounded-lg shadow-lg">
			<!-- Add your modal content and form here, pre-filled with selectedExpense data -->
			<h2 class="text-2xl font-semibold mb-4">Edit Expense</h2>
			<form>
				<!-- Your form fields go here -->
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit"
				>
					Save Changes
				</button>
			</form>
			<button
				class="mt-4 text-gray-600 hover:text-gray-800"
				on:click={() => (selectedExpense = null)}
			>
				Close
			</button>
		</div>
	</div>
{/if}
